import React from 'react';
import { ROLES_LIST } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';

export const AdminPanel: React.FC = () => {
  const { role, setShowAuditModal } = useAuth();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hospital Administration & RBAC Management</h2>
          <p className="text-xs text-slate-500">Manage 8 system user roles, access control permissions, and server logs</p>
        </div>
        <button
          onClick={() => setShowAuditModal(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition"
        >
          🛡️ View Audit Trail
        </button>
      </div>

      {/* User Roles Management Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
          User Role Permissions Matrix (8 Roles)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-2.5">Role Name</th>
                <th className="p-2.5">Sample User</th>
                <th className="p-2.5">Designated Title</th>
                <th className="p-2.5">Permission Tier</th>
                <th className="p-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {ROLES_LIST.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">{r.id}</td>
                  <td className="p-2.5 font-semibold">{r.name}</td>
                  <td className="p-2.5 text-slate-500">{r.title}</td>
                  <td className="p-2.5 font-mono text-[11px]">
                    {r.id === 'Administrator' ? 'Full SuperAdmin (Level 1)' : r.id.includes('Surgeon') ? 'Clinical Full Access (Level 2)' : 'Restricted (Level 3)'}
                  </td>
                  <td className="p-2.5">
                    <button className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded font-bold text-[10px]">
                      Edit Permissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
