import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';

export const PostOpAnalysis: React.FC = () => {
  const { activePatient } = usePatient();
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Post-Operative CT Alignment & Healing Evaluation</h2>
          <p className="text-xs text-slate-500">Pre-op vs Post-op CT overlay comparison slider for {activePatient.name}</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">
          Primary Bone Union: 96.5%
        </span>
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 min-h-[400px] flex flex-col justify-between shadow-2xl relative">
        <div className="flex justify-between text-xs text-slate-400 font-mono z-10">
          <span className="text-blue-400">Pre-Operative CT (Ameloblastoma Defect)</span>
          <span className="text-emerald-400">Post-Operative CT (Fibula Graft + Plate)</span>
        </div>

        {/* Image Split Slider Visual */}
        <div className="my-auto flex flex-col items-center justify-center relative py-6">
          <div className="w-full max-w-xl h-64 bg-slate-900 rounded-2xl border border-slate-700 relative overflow-hidden flex items-center justify-center text-7xl shadow-2xl">
            💀
            <div
              className="absolute inset-0 bg-blue-900/40 border-r-2 border-emerald-400 flex items-center justify-center font-bold text-white text-xs"
              style={{ width: `${sliderPos}%` }}
            >
              Pre-Op Mandibular Defect Zone
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(parseInt(e.target.value))}
            className="w-full max-w-xl mt-4 accent-emerald-500"
          />
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-900 font-mono">
          <span>Alignment Error: <strong>0.4 mm</strong></span>
          <span>Bone Graft Gap: <strong>0.2 mm</strong></span>
          <span>Result: <strong className="text-emerald-400">EXCELLENT PRIMARY UNION</strong></span>
        </div>
      </div>
    </div>
  );
};
