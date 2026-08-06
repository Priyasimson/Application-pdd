import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';

export const TissueRemovalEstimator: React.FC = () => {
  const { activePatient, updateMargin } = usePatient();
  const [unit, setUnit] = useState<'cm3' | 'mm3' | 'mL' | 'm3'>('cm3');
  const tr = activePatient.tissueRemoval;

  const handleSliderChange = (val: number) => {
    updateMargin(activePatient.id, val);
  };

  const formatVolume = (volCm3: number) => {
    if (unit === 'mm3') return `${(volCm3 * 1000).toLocaleString()} mm³`;
    if (unit === 'mL') return `${volCm3} mL`;
    if (unit === 'm3') return `${(volCm3 / 1000000).toFixed(6)} m³`;
    return `${volCm3} cm³`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pathology Removal & Margin Estimator</h2>
          <p className="text-xs text-slate-500">Calculate total resection volume with live unit toggles and nerve clearance warning</p>
        </div>
        <div className="flex space-x-1">
          {(['cm3', 'mm3', 'mL', 'm3'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-3 py-1 rounded text-xs font-bold font-mono transition ${
                unit === u ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Slider & Controls */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            Surgical Safety Margin Tuner
          </h3>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-700 dark:text-slate-200">Safety Margin Clearance Distance:</span>
              <span className="text-base font-bold font-mono text-blue-600">{tr.surgicalMargin} cm ({tr.surgicalMargin * 10} mm)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={tr.surgicalMargin}
              onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>0.5 cm (Tight)</span>
              <span>1.0 cm (Standard Oncological Margin)</span>
              <span>2.0 cm (Wide)</span>
            </div>
          </div>

          {/* Dynamic Nerve Margin Alert Badge */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              tr.marginSafety === 'Dangerous'
                ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                : tr.marginSafety === 'Warning'
                ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
            }`}
          >
            <div>
              <p className="font-bold text-sm">
                Nerve Margin Safety Status: {tr.marginSafety.toUpperCase()}
              </p>
              <p className="text-xs opacity-90 mt-0.5">
                Distance to Inferior Alveolar Nerve (IAN): <strong>{tr.criticalNerveDistance} mm</strong>
              </p>
            </div>
            <span className="text-2xl">
              {tr.marginSafety === 'Dangerous' ? '🚨' : tr.marginSafety === 'Warning' ? '⚠️' : '🛡️'}
            </span>
          </div>
        </div>

        {/* Right Volumetric Results Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 text-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm border-b border-slate-800 pb-2">AI Volumetric Calculation Payload</h3>

            <div className="mt-4 space-y-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Tumor Pathology Core Volume</span>
                <p className="text-xl font-bold font-mono text-rose-400">{formatVolume(tr.tumorVolume)}</p>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Total Surgical Removal Volume (Inc. Margin)</span>
                <p className="text-2xl font-bold font-mono text-emerald-400">{formatVolume(tr.totalRemovalVolume)}</p>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Remaining Healthy Bone Percentage</span>
                <p className="text-xl font-bold font-mono text-blue-400">{tr.remainingHealthyTissue}%</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Volumetric payload saved to patient record.')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl transition text-xs shadow-lg shadow-blue-500/20"
          >
            💾 Commit Volumetric Calculation
          </button>
        </div>
      </div>
    </div>
  );
};
