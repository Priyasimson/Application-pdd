import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, User, AuditEntry } from '../types';
import { ROLES_LIST, MOCK_AUDIT_LOGS } from '../services/mockData';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  mfaRequired: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  auditLogs: AuditEntry[];
  activeSessions: ActiveSession[];
  toasts: Toast[];
  showOTPModal: boolean;
  showAuditModal: boolean;
  isProcessing: boolean;
  login: (email: string, pass: string, selectedRole: UserRole, rememberMe: boolean) => Promise<boolean>;
  verifyOTP: (code: string) => boolean;
  resendOTP: () => void;
  logout: () => void;
  logoutAllDevices: () => void;
  switchRole: (newRole: UserRole) => void;
  setShowOTPModal: (show: boolean) => void;
  setShowAuditModal: (show: boolean) => void;
  logAction: (action: string, target: string) => void;
  addToast: (type: Toast['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('Senior Surgeon');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [mfaRequired, setMfaRequired] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>('reconai_jwt_sample_token_v3');
  const [refreshToken, setRefreshToken] = useState<string | null>('reconai_refresh_token_v3');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>(MOCK_AUDIT_LOGS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    { id: 'SESS-1', device: 'Chrome v126 on Windows 11', ip: '192.168.1.104', location: 'St. Jude Hospital (Internal)', lastActive: 'Just Now', isCurrent: true },
    { id: 'SESS-2', device: 'Safari on iPad Pro (OR Suite 2)', ip: '192.168.1.112', location: 'OR Workstation', lastActive: '2 hours ago', isCurrent: false }
  ]);

  const matchedRole = ROLES_LIST.find((r) => r.id === role) || ROLES_LIST[0];

  const currentUser: User = {
    id: 'USR-88392',
    name: matchedRole.name,
    email: `${matchedRole.name.toLowerCase().replace(/[^a-z]/g, '')}@hospital.org`,
    role: matchedRole.id,
    title: matchedRole.title,
    avatar: matchedRole.avatar,
    department: 'Oral & Maxillofacial Surgery',
    mfaEnabled: true,
    phone: '+1 (555) 019-2831'
  };

  const addToast = (type: Toast['type'], title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAction = (action: string, target: string) => {
    const newEntry: AuditEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: currentUser.name,
      role: currentUser.role,
      action,
      target,
      ipAddress: '192.168.1.104',
      geoInfo: 'Hospital Local Subnet (Secure)'
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const login = async (email: string, pass: string, selectedRole: UserRole, rememberMe: boolean): Promise<boolean> => {
    setIsProcessing(true);
    setRole(selectedRole);

    // Simulate API Auth Request
    await new Promise((resolve) => setTimeout(resolve, 800));

    setAccessToken(`reconai_jwt_${Date.now()}`);
    setRefreshToken(`reconai_refresh_${Date.now()}`);

    if (rememberMe) {
      localStorage.setItem('reconai_remember_device', 'true');
    }

    logAction('AUTH_LOGIN_SUCCESS', `Email: ${email} | Role: ${selectedRole}`);
    setIsProcessing(false);
    setMfaRequired(true);
    setShowOTPModal(true);
    addToast('info', '2FA Verification Required', 'A 6-digit OTP security code has been sent to your hospital authenticator.');
    return true;
  };

  const verifyOTP = (code: string) => {
    if (code === '849217' || code === '123456' || code.length === 6) {
      setIsAuthenticated(true);
      setMfaRequired(false);
      setShowOTPModal(false);
      logAction('2FA_OTP_VERIFIED', 'Session Fully Authenticated');
      addToast('success', 'Authentication Successful', `Welcome back, ${currentUser.name}. Role: ${role}`);
      return true;
    }
    addToast('error', 'Verification Failed', 'Invalid 6-digit OTP code. Please check your authenticator app.');
    return false;
  };

  const resendOTP = () => {
    logAction('2FA_OTP_RESENT', 'New OTP Code Triggered');
    addToast('info', 'New OTP Sent', 'A fresh 6-digit OTP code has been dispatched to your device.');
  };

  const logout = () => {
    logAction('USER_LOGOUT', 'Session Closed');
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    addToast('warning', 'Logged Out', 'Your surgical session has been terminated safely.');
  };

  const logoutAllDevices = () => {
    logAction('LOGOUT_ALL_DEVICES', 'All Active Sessions Revoked');
    setActiveSessions((prev) => prev.filter((s) => s.isCurrent));
    addToast('success', 'Sessions Revoked', 'Logged out from all other active devices.');
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    logAction('ROLE_SWITCH', `Switched role to ${newRole}`);
    addToast('info', 'Role Updated', `Switched active surgical view to ${newRole}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user: isAuthenticated ? currentUser : null,
        role,
        isAuthenticated,
        mfaRequired,
        accessToken,
        refreshToken,
        auditLogs,
        activeSessions,
        toasts,
        showOTPModal,
        showAuditModal,
        isProcessing,
        login,
        verifyOTP,
        resendOTP,
        logout,
        logoutAllDevices,
        switchRole,
        setShowOTPModal,
        setShowAuditModal,
        logAction,
        addToast,
        removeToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
