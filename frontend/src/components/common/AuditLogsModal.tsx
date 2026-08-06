import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const AuditLogsModal: React.FC = () => {
  const { auditLogs, showAuditModal, setShowAuditModal } = useAuth();

  if (!showAuditModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl p-6 relative max-h-[85vh] flex flex-col animate-scaleUp">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg">
              🛡️
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Security & Access Audit Logs</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">HIPAA Compliant User Action & IP Trail</p>
            </div>
          </div>
          <button onClick={() => setShowAuditModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto my-4 custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <th className="p-2.5">ID</th>
                <th className="p-2.5">Timestamp</th>
                <th className="p-2.5">User & Role</th>
                <th className="p-2.5">Action Event</th>
                <th className="p-2.5">Target Scope</th>
                <th className="p-2.5">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-mono text-[10px] text-slate-400">{log.id}</td>
                  <td className="p-2.5 font-mono text-[11px]">{log.timestamp}</td>
                  <td className="p-2.5">
                    <p className="font-bold">{log.user}</p>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400">{log.role}</span>
                  </td>
                  <td className="p-2.5 font-semibold text-slate-900 dark:text-slate-100">{log.action}</td>
                  <td className="p-2.5">{log.target}</td>
                  <td className="p-2.5 font-mono text-[11px] text-slate-500">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Total Recorded System Events: {auditLogs.length}</span>
          <button
            onClick={() => setShowAuditModal(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition"
          >
            Close Audit Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
