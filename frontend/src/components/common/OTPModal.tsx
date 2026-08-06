import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

export const OTPModal: React.FC = () => {
  const { showOTPModal, setShowOTPModal, verifyOTP, resendOTP } = useAuth();
  const [digits, setDigits] = useState(['8', '4', '9', '2', '1', '7']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: any;
    if (showOTPModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOTPModal, timer]);

  if (!showOTPModal) return null;

  const handleChange = (index: number, val: string) => {
    // Handle Paste 6 digits into any box
    if (val.length >= 6) {
      const pastedDigits = val.slice(0, 6).split('');
      const newDigits = [...digits];
      pastedDigits.forEach((d, i) => {
        newDigits[i] = d;
      });
      setDigits(newDigits);
      inputRefs.current[5]?.focus();
      return;
    }

    const char = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    // Auto Focus Next Box
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace Navigation to Previous Box
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handleResendClick = () => {
    resendOTP();
    setTimer(30);
    setCanResend(false);
  };

  const handleVerify = () => {
    const code = digits.join('');
    verifyOTP(code);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm p-6 text-center animate-scaleUp relative">
        <button
          onClick={() => setShowOTPModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold"
        >
          ✕
        </button>

        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto text-2xl mb-3">
          🔑
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">2FA Security OTP</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enter 6-digit code sent to your hospital device.</p>

        {/* 6-Digit OTP Inputs */}
        <div className="flex justify-center space-x-2 my-6">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-10 h-12 text-center text-lg font-bold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ))}
        </div>

        {/* Countdown Timer & Resend OTP */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 px-2">
          <span>
            {timer > 0 ? (
              <span className="font-mono">Resend code in {timer}s</span>
            ) : (
              <span className="text-rose-500 font-semibold">Code expired</span>
            )}
          </span>
          <button
            type="button"
            disabled={!canResend}
            onClick={handleResendClick}
            className={`font-bold transition ${
              canResend ? 'text-blue-600 dark:text-blue-400 hover:underline cursor-pointer' : 'text-slate-400 cursor-not-allowed'
            }`}
          >
            Resend OTP
          </button>
        </div>

        <button
          onClick={handleVerify}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-md shadow-emerald-500/20"
        >
          Verify & Access System
        </button>
      </div>
    </div>
  );
};
