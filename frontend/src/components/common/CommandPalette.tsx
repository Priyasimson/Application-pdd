import React, { useState, useEffect } from 'react';
import { usePatient } from '../../context/PatientContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { setActiveModule, patients, setActivePatientId } = usePatient();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setSearch('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const COMMANDS = [
    { title: 'Open 3D Reconstruction Viewer', module: 'reconstruction3d', icon: '🧊' },
    { title: 'Launch Digital Twin Simulator', module: 'digitaltwin', icon: '🥽' },
    { title: 'Run Tissue Removal Estimator', module: 'tissue-removal', icon: '✂️' },
    { title: 'View Free Flap Recommendations', module: 'flap-recommendation', icon: '🧬' },
    { title: 'Calculate Fixation FEA Stress', module: 'fixation', icon: '🔧' },
    { title: 'Generate Surgical PDF Report', module: 'reports', icon: '📄' },
    { title: 'View Patient Management', module: 'patients', icon: '🏥' },
    { title: 'Open Security Audit Logs', module: 'admin', icon: '🛡️' }
  ];

  const filteredCommands = COMMANDS.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-4 animate-scaleUp">
        <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="text-lg">🔍</span>
          <input
            type="text"
            placeholder="Type command or search patient (e.g., 'Digital Twin', 'Robert Sterling')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-400 text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
            ESC
          </button>
        </div>

        <div className="py-3 max-h-80 overflow-y-auto space-y-1 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Module Shortcuts</p>
          {filteredCommands.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveModule(cmd.module);
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-between text-slate-700 dark:text-slate-200 transition"
            >
              <div className="flex items-center space-x-3">
                <span>{cmd.icon}</span>
                <span className="font-semibold">{cmd.title}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Jump →</span>
            </button>
          ))}

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mt-3 mb-1">Quick Select Patient</p>
          {patients.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePatientId(p.id);
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 flex items-center justify-between text-slate-700 dark:text-slate-200 transition"
            >
              <div className="flex items-center space-x-3">
                <span>👤</span>
                <div>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-[10px] text-slate-500">{p.diagnosis}</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">{p.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
