import React from 'react';

export const InventoryLibrary: React.FC = () => {
  const HARDWARE = [
    { name: 'Synthes MatrixMANDIBLE 2.0 Reconstruction Plate', mfg: 'DePuy Synthes', material: 'Ti-6Al-4V Titanium', stock: '24 Units', thickness: '2.0 mm' },
    { name: 'Synthes MatrixMANDIBLE 2.4 Reconstruction Plate', mfg: 'DePuy Synthes', material: 'Ti-6Al-4V Titanium', stock: '18 Units', thickness: '2.4 mm' },
    { name: 'KLS Martin Modus 2.0 Miniplate', mfg: 'KLS Martin', material: 'Pure Titanium Grade 4', stock: '45 Units', thickness: '1.5 mm' },
    { name: 'Stryker Universal Mandible Locking Screws 2.4mm', mfg: 'Stryker', material: 'Ti Alloy', stock: '240 Screws', thickness: '2.4 mm' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Implant & Hardware Inventory Library</h2>
          <p className="text-xs text-slate-500">Osteosynthesis plates, locking screws, and patient-specific implant stock</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {HARDWARE.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold text-[10px]">
              {item.mfg}
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</h3>
            <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Material: <strong className="text-slate-800 dark:text-slate-200">{item.material}</strong></span>
              <span>In Stock: <strong className="text-emerald-600 font-bold">{item.stock}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
