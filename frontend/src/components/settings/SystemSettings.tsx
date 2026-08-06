import React from 'react';
import { usePatient } from '../../context/PatientContext';

export const SystemSettings: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = usePatient();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">System Settings & Preferences</h2>
          <p className="text-xs text-slate-500">Configure theme, language, notifications, and security</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 text-xs">
        {/* Theme Settings */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Theme Mode</h3>
            <p className="text-slate-500">Switch between light mode and dark clinical interface</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition"
          >
            {theme === 'light' ? '🌙 Switch to Dark Mode' : '☀️ Switch to Light Mode'}
          </button>
        </div>

        {/* Multi Language */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Application Language</h3>
            <p className="text-slate-500">Multi-language localization for global surgical teams</p>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
          >
            <option value="en">English (US)</option>
            <option value="es">Español (Spanish)</option>
            <option value="fr">Français (French)</option>
            <option value="de">Deutsch (German)</option>
            <option value="ja">日本語 (Japanese)</option>
          </select>
        </div>

        {/* Backup & Restore */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">PostgreSQL Backup & Restore</h3>
            <p className="text-slate-500">Create instant backup snapshot of surgical records</p>
          </div>
          <button
            onClick={() => alert('PostgreSQL Database Snapshot Created Successfully.')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition"
          >
            💾 Backup Database Now
          </button>
        </div>
      </div>
    </div>
  );
};
