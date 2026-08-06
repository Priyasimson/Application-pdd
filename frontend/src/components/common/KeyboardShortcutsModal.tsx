import React from 'react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const SHORTCUTS = [
    { key: 'Ctrl + K', description: 'Open Search & Command Palette Everywhere' },
    { key: 'Shift + D', description: 'Jump to Digital Twin Surgical Sandbox' },
    { key: 'Shift + P', description: 'Jump to Patient Management' },
    { key: 'Shift + R', description: 'Generate Surgical PDF Report' },
    { key: 'Shift + A', description: 'Toggle Floating AI Surgical Assistant' },
    { key: 'Esc', description: 'Close Modals & Drawers' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 relative animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">⌨️ Keyboard Shortcuts Guide</h3>
          <button onClick={onClose} className="text-slate-400 text-lg">
            ✕
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {SHORTCUTS.map((s, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-700 dark:text-slate-200 font-medium">{s.description}</span>
              <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 font-mono text-[11px] rounded text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
