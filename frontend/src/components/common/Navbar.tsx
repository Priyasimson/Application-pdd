import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePatient } from '../../context/PatientContext';
import { MOCK_NOTIFICATIONS } from '../../services/mockData';

interface NavbarProps {
  onOpenAIChat: () => void;
  onOpenCommandPalette: () => void;
  onOpenShortcuts: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAIChat, onOpenCommandPalette, onOpenShortcuts }) => {
  const { user, role, setShowAuditModal } = useAuth();
  const { patients, activePatient, setActivePatientId, theme, toggleTheme, isOffline, toggleOffline } = usePatient();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-20 shadow-sm transition-colors duration-200">
      {/* Active Case Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Case:</span>
          <select
            value={activePatient.id}
            onChange={(e) => setActivePatientId(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id} className="dark:bg-slate-900">
                {p.name} ({p.id})
              </option>
            ))}
          </select>
        </div>

        <div className="hidden lg:flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-800">
            {activePatient.disease}
          </span>
          <span>{activePatient.age} Y / {activePatient.gender}</span>
          <span className="font-mono text-slate-400 dark:text-slate-500">{activePatient.hospitalNo}</span>
        </div>
      </div>

      {/* Action Controls & User Info */}
      <div className="flex items-center space-x-3">
        {/* Offline Toggle */}
        <button
          onClick={toggleOffline}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition ${
            isOffline
              ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300'
          }`}
          title="Toggle Hospital Network Connectivity Mode"
        >
          {isOffline ? 'Offline Mode' : 'Online Sync'}
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <span>Search (Ctrl+K)</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Toggle Light / Dark Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Floating AI Assistant Trigger */}
        <button
          onClick={onOpenAIChat}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-md shadow-blue-500/20"
        >
          <span>🤖 AI Assistant</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition"
          >
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 p-4 animate-scaleUp">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Hospital Alerts</h4>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                  3 New
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
                {MOCK_NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                    <span className="text-[9px] text-slate-400 font-mono mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Audit Log trigger */}
        <button
          onClick={() => setShowAuditModal(true)}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Security Audit Logs"
        >
          🛡️
        </button>

        {/* Shortcuts Guide trigger */}
        <button
          onClick={onOpenShortcuts}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-bold"
          title="Keyboard Shortcuts (?)"
        >
          ?
        </button>

        {/* User Role Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover border border-blue-500/40" />
          <div className="hidden xl:block">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">{user?.name}</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
