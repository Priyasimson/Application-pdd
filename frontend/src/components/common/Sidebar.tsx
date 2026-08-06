import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePatient } from '../../context/PatientContext';
import { UserRole } from '../../types';
import { ROLES_LIST } from '../../services/mockData';

interface SidebarProps {
  onOpenLoginModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenLoginModal }) => {
  const { role, switchRole, logout } = useAuth();
  const { activeModule, setActiveModule } = usePatient();

  const NAV_ITEMS = [
    { section: 'Main' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'patients', label: 'Patient Management', icon: '🏥' },
    { id: 'imaging', label: 'Medical Image Upload', icon: '📥' },

    { section: 'AI Intelligence' },
    { id: 'segmentation', label: 'AI Segmentation', icon: '🔬' },
    { id: 'reconstruction3d', label: '3D Reconstruction', icon: '🧊' },
    { id: 'bone-analysis', label: 'Bone Analysis', icon: '🦴' },
    { id: 'soft-tissue', label: 'Soft Tissue Analysis', icon: '🩸' },
    { id: 'tissue-removal', label: 'Tissue Removal Estimator', icon: '✂️' },
    { id: 'margin-analysis', label: 'Margin Clearance', icon: '📐' },

    { section: 'Planning & Hardware' },
    { id: 'flap-recommendation', label: 'Free Flap Selection', icon: '🧬' },
    { id: 'fixation', label: 'Fixation & FEA Stress', icon: '🔧' },
    { id: 'surgical-planning', label: 'AI Surgical Planning', icon: '📑' },
    { id: 'digital-twin', label: 'Digital Twin Simulator', icon: '🥽', highlight: true },
    { id: 'comparative', label: 'Comparative Analysis', icon: '⚖️' },
    { id: 'risk-prediction', label: 'Risk Prediction', icon: '⚠️' },
    { id: 'postop', label: 'Post-Op Evaluation', icon: '📝' },

    { section: 'Outputs & Administration' },
    { id: 'reports', label: 'Surgical PDF Reports', icon: '📄' },
    { id: 'inventory', label: 'Implant Library', icon: '📦' },
    { id: 'analytics', label: 'Hospital Analytics', icon: '📈' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' },
    { id: 'admin', label: 'Admin Panel', icon: '🔐' }
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col flex-shrink-0 transition-all duration-300 z-30 shadow-xl relative">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-[#0B1120]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            🦴
          </div>
          <div>
            <h1 className="font-bold text-white text-lg tracking-wide leading-tight">
              Recon<span className="text-blue-400">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Maxillofacial System</p>
          </div>
        </div>
      </div>

      {/* Role Selector Dropdown */}
      <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/50 flex flex-col space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-semibold">
          <span>Active Role:</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono">v3.4 Active</span>
        </div>
        <select
          value={role}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="w-full bg-slate-800 text-xs font-semibold text-white px-2 py-1.5 rounded-lg border border-slate-700 focus:outline-none cursor-pointer"
        >
          {ROLES_LIST.map((r) => (
            <option key={r.id} value={r.id}>
              {r.id} ({r.name.split(' ')[0]})
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 custom-scrollbar text-xs">
        {NAV_ITEMS.map((item, idx) => {
          if (item.section) {
            return (
              <div key={idx} className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {item.section}
              </div>
            );
          }

          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id!)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : item.highlight
                  ? 'bg-gradient-to-r from-blue-900/40 to-emerald-900/40 border border-blue-700/40 text-blue-200 hover:text-white'
                  : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Profile Controls */}
      <div className="p-3 border-t border-slate-800 bg-[#0B1120] flex items-center justify-between">
        <button onClick={onOpenLoginModal} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition flex items-center justify-center space-x-2">
          <span>🔒 Switch Role / Portal Login</span>
        </button>
      </div>
    </aside>
  );
};
