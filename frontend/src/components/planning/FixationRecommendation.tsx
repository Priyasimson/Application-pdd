import React, { useState } from 'react';
import { FIXATION_SPECS } from '../../services/mockData';
import { usePatient } from '../../context/PatientContext';

export const FixationRecommendation: React.FC = () => {
  const { activePatient } = usePatient();
  const [screws, setScrews] = useState(FIXATION_SPECS.screwCount);
  const [masticatoryLoad, setMasticatoryLoad] = useState(350); // Newtons

  // von Mises stress calculation simulation
  const vonMisesMax = Number(((masticatoryLoad / (screws * 0.45)) + 45.0).toFixed(1));
  const safetyFactor = Number((880.0 / vonMisesMax).toFixed(2));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Fixation & Finite Element Analysis (FEA)</h2>
          <p className="text-xs text-slate-500">Osteosynthesis plate selection & masticatory von Mises stress biomechanics</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-xs rounded-full">
          FEA Status: CONVERGED
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Screen: Plate Specifications */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
            Recommended Plate & Screw Hardware
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-slate-400 block text-[10px]">Plate Specifications</span>
              <p className="font-bold text-slate-900 dark:text-white">{FIXATION_SPECS.plateType}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Material Grade</span>
              <p className="font-bold text-blue-600">{FIXATION_SPECS.material}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <span className="text-slate-400 block text-[9px]">Plate Thickness</span>
                <span className="font-bold">{FIXATION_SPECS.thicknessMm} mm</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                <span className="text-slate-400 block text-[9px]">Screw Diameter</span>
                <span className="font-bold">{FIXATION_SPECS.screwDiameterMm} mm</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Bicortical Locking Screws</span>
                <span className="font-mono text-blue-600">{screws} Screws</span>
              </div>
              <input
                type="range"
                min="4"
                max="10"
                value={screws}
                onChange={(e) => setScrews(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Masticatory Force Load</span>
                <span className="font-mono text-emerald-600">{masticatoryLoad} N</span>
              </div>
              <input
                type="range"
                min="100"
                max="600"
                step="25"
                value={masticatoryLoad}
                onChange={(e) => setMasticatoryLoad(parseInt(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Right 2/3 FEA Stress Heatmap Sandbox */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-4 text-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm">FEA von Mises Stress Distribution Heatmap</h3>
                <p className="text-[10px] text-slate-400">Biomechanical stress load under {masticatoryLoad}N chewing force</p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 font-mono text-xs rounded border border-emerald-700/50">
                Safety Factor: {safetyFactor}
              </span>
            </div>

            {/* Simulated Heatmap Visual */}
            <div className="my-6 h-48 rounded-xl bg-gradient-to-r from-blue-900 via-emerald-600 via-amber-500 to-rose-600 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
              <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-xl text-center border border-white/20">
                <p className="font-bold text-base">Peak Stress: {vonMisesMax} MPa</p>
                <p className="text-[10px] text-slate-300 mt-1">Location: Distal Osteotomy Gap Interface</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-center border-t border-slate-900 pt-3">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-400 text-[10px] block">Yield Limit (Titanium)</span>
              <span className="font-bold text-slate-200">880.0 MPa</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-400 text-[10px] block">Max von Mises</span>
              <span className="font-bold text-rose-400">{vonMisesMax} MPa</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-400 text-[10px] block">Stability Score</span>
              <span className="font-bold text-emerald-400">94 / 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
