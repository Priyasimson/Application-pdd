import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate Limiter for Authentication & Sensitive Actions
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api/', apiLimiter);

// In-Memory Security Audit Logs Data Store
interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  geoInfo: string;
}

const auditLogs: AuditEntry[] = [
  { id: '1', timestamp: new Date().toISOString(), user: 'Dr. Sarah Jenkins', role: 'Senior Surgeon', action: 'USER_LOGIN', target: 'System Portal', ipAddress: '192.168.1.104', geoInfo: 'St. Jude Hospital (Internal)' },
  { id: '2', timestamp: new Date().toISOString(), user: 'Dr. Marcus Vance', role: 'Radiologist', action: 'SCAN_UPLOAD', target: 'CBCT DICOM (P-88392)', ipAddress: '192.168.1.112', geoInfo: 'Radiology Workstation 4' }
];

// Helper: Log Action
function recordAudit(user: string, role: string, action: string, target: string, req: Request) {
  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
  auditLogs.unshift({
    id: String(Date.now()),
    timestamp: new Date().toISOString(),
    user,
    role,
    action,
    target,
    ipAddress: String(ip),
    geoInfo: 'Hospital Local Subnet (Secure)'
  });
}

// -----------------------------------------------------------------------------
// REQUESTED AUTHENTICATION ENDPOINTS
// -----------------------------------------------------------------------------

// 1. POST /login
app.post('/login', (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }
  if (!password) {
    return res.status(400).json({ success: false, error: 'Password is required.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, error: 'Password must contain at least 8 characters.' });
  }

  const selectedRole = role || 'Senior Surgeon';
  const userName = email.includes('vance') ? 'Dr. Marcus Vance' : email.includes('admin') ? 'Alex Rivera' : 'Dr. Sarah Jenkins';

  recordAudit(userName, selectedRole, 'AUTH_LOGIN_SUCCESS', 'System Portal', req);

  res.cookie('reconai_session', 'session_token_sample', { httpOnly: true, secure: true, sameSite: 'strict' });

  res.json({
    success: true,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.reconai_jwt_sample_token',
    refreshToken: 'ref_token_883921932',
    user: {
      id: 'USR-88392',
      email,
      name: userName,
      role: selectedRole,
      department: 'Oral & Maxillofacial Surgery',
      mfaRequired: true
    }
  });
});

// 2. POST /logout
app.post('/logout', (req: Request, res: Response) => {
  recordAudit('Dr. Sarah Jenkins', 'Senior Surgeon', 'USER_LOGOUT', 'Single Session Terminated', req);
  res.clearCookie('reconai_session');
  res.json({ success: true, message: 'Logged out successfully.' });
});

// 3. POST /refresh-token
app.post('/refresh-token', (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ success: false, error: 'Refresh token is required.' });
  }
  res.json({
    success: true,
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.reconai_new_access_token_${Date.now()}`,
    expiresIn: '15 Minutes'
  });
});

// 4. POST /forgot-password
app.post('/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }
  recordAudit('System Guest', 'Guest', 'FORGOT_PASSWORD_REQUEST', `Email: ${email}`, req);
  res.json({
    success: true,
    message: 'Password reset link has been dispatched to your hospital email.'
  });
});

// 5. POST /verify-otp
app.post('/verify-otp', (req: Request, res: Response) => {
  const { otpCode } = req.body;
  if (!otpCode || (otpCode !== '849217' && otpCode !== '123456' && otpCode.length !== 6)) {
    return res.status(400).json({ success: false, error: 'Invalid 6-digit OTP verification code.' });
  }

  recordAudit('Dr. Sarah Jenkins', 'Senior Surgeon', '2FA_OTP_VERIFIED', 'Session Verified', req);
  res.json({
    success: true,
    message: 'Multi-Factor Authentication verified successfully.',
    sessionExpiresIn: '12 Hours'
  });
});

// 6. POST /audit-log
app.post('/audit-log', (req: Request, res: Response) => {
  const { action, target, user, role } = req.body;
  recordAudit(user || 'Dr. Sarah Jenkins', role || 'Senior Surgeon', action || 'CUSTOM_ACTION', target || 'System', req);
  res.json({ success: true, count: auditLogs.length, latestLog: auditLogs[0] });
});

// 7. POST /logout-all
app.post('/logout-all', (req: Request, res: Response) => {
  recordAudit('Dr. Sarah Jenkins', 'Senior Surgeon', 'LOGOUT_ALL_DEVICES', 'All Active Sessions Terminated', req);
  res.json({ success: true, message: 'Logged out from all active devices successfully.' });
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    system: 'ReconAI Maxillofacial Reconstruction Engine',
    version: 'v3.4.0-Production',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`[ReconAI Express Server] Listening on http://localhost:${PORT}`);
});
