import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';
import { ROLES_LIST } from '../../services/mockData';

interface LoginPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ isOpen, onClose }) => {
  const { login, isProcessing, addToast } = useAuth();

  const [email, setEmail] = useState('dr.jenkins@hospital.org');
  const [password, setPassword] = useState('ReconAI#2026!Secure');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Senior Surgeon');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPasswordText, setShowPasswordText] = useState(false);

  // Field Level Validation Error States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (!isOpen) return null;

  // 4-Tier Password Strength Calculation Rule
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-300' };
    const hasMinLen = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNum = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    const matchCount = [hasMinLen, hasUpper, hasLower, hasNum, hasSpecial].filter(Boolean).length;

    if (!hasMinLen || matchCount <= 2) {
      return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    }
    if (matchCount === 3) {
      return { score: 2, label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    }
    if (matchCount === 4) {
      return { score: 3, label: 'Strong', color: 'bg-blue-500', text: 'text-blue-600' };
    }
    return { score: 4, label: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strength = getPasswordStrength(password);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Standardized Email Validation
    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Enter a valid email address.');
      isValid = false;
    }

    // Standardized Password Validation
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must contain at least 8 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let res = '';
    for (let i = 0; i < 14; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
    setPasswordError('');
    addToast('info', 'Password Generated', 'A 14-character strong secure password has been generated.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await login(email.trim(), password, selectedRole, rememberMe);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative animate-scaleUp">
        <button
          onClick={onClose}
          aria-label="Close portal login modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-white z-20 text-xl font-bold bg-slate-800/60 p-2 rounded-full transition"
        >
          ✕
        </button>

        {/* LEFT SIDE: Hospital Illustration & ReconAI Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1e3a8a] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
                🦴
              </div>
              <div>
                <h2 className="font-bold text-2xl tracking-wide">
                  Recon<span className="text-blue-400">AI</span>
                </h2>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Maxillofacial System</p>
              </div>
            </div>

            {/* Medical Animated Graphics Canvas */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-200">Hospital Medical AI Core v3.4</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enterprise surgical planning suite with real-time CT volumetric segmentation, free flap matching, and osteosynthesis FEA simulation.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <span className="text-emerald-400">✓</span>
              <span>8 Role-Based Access Control Matrix</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <span className="text-emerald-400">✓</span>
              <span>2FA Multi-Factor Authentication & Audit Logs</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <span className="text-emerald-400">✓</span>
              <span>HIPAA Compliant Enterprise Encryption</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Authentication Form */}
        <div className="md:w-1/2 p-8 bg-white dark:bg-slate-900 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Surgeon Portal Login</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select role and enter enterprise credentials</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
            {/* Role Select */}
            <div>
              <label htmlFor="roleSelect" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select User Role
              </label>
              <select
                id="roleSelect"
                tabIndex={1}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {ROLES_LIST.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.id} ({r.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="emailInput" className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Hospital Email
              </label>
              <input
                id="emailInput"
                type="email"
                tabIndex={2}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? 'email-error-msg' : undefined}
                placeholder="name@hospital.org"
                className={`w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  emailError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {emailError && (
                <p id="email-error-msg" role="alert" className="text-[11px] text-rose-600 font-bold mt-1">
                  ⚠️ {emailError}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="passwordInput" className="font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Generate Strong Password
                </button>
              </div>
              <div className="relative">
                <input
                  id="passwordInput"
                  type={showPasswordText ? 'text' : 'password'}
                  tabIndex={3}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={passwordError ? 'password-error-msg' : undefined}
                  placeholder="••••••••••••"
                  className={`w-full px-3 py-2 pr-10 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    passwordError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                  title={showPasswordText ? 'Hide password' : 'Show password'}
                >
                  {showPasswordText ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>
              {passwordError && (
                <p id="password-error-msg" role="alert" className="text-[11px] text-rose-600 font-bold mt-1">
                  ⚠️ {passwordError}
                </p>
              )}

              {/* 4-Tier Password Strength Meter */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">Password Strength:</span>
                    <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  tabIndex={4}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember Device</span>
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  addToast('info', 'Password Reset', 'Password reset instructions dispatched to your registered email.');
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button with Spinner & Disabled State */}
            <button
              type="submit"
              tabIndex={5}
              disabled={isProcessing}
              className={`w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md shadow-blue-500/20 transition flex items-center justify-center space-x-2 ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  <span>Authenticating Credentials...</span>
                </>
              ) : (
                <span>Authenticate & Launch System</span>
              )}
            </button>

            {/* SSO Options */}
            <div className="pt-2 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-semibold mb-2">Or Continue With</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  tabIndex={6}
                  onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                  className="py-2 px-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold transition flex items-center justify-center space-x-1.5"
                >
                  <span>🌐</span>
                  <span>Google SSO</span>
                </button>
                <button
                  type="button"
                  tabIndex={7}
                  onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                  className="py-2 px-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold transition flex items-center justify-center space-x-1.5"
                >
                  <span>🪟</span>
                  <span>Microsoft AD</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
