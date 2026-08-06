import React from 'react';
import { usePatient } from '../../context/PatientContext';

export const SoftTissueAnalysis: React.FC = () => {
  const { activePatient } = usePatient();
  const st = activePatient.softTissueMetrics;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Soft Tissue Volumetric & Coverage Analysis</h2>
          <p className="text-xs text-slate-500">Estimates skin paddle thickness, masseter muscle loss, and vascular perfusion</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">
          Vascular Status: {st.bloodSupply}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Soft Tissue Deficit</span>
          <p className="text-2xl font-bold text-rose-600 mt-1 font-display">{st.softTissueLoss} cm³</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Masseter Muscle Thickness</span>
          <p className="text-2xl font-bold text-blue-600 mt-1 font-display">{st.muscleThickness} mm</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Skin Thickness</span>
          <p className="text-2xl font-bold text-purple-600 mt-1 font-display">{st.skinThickness} mm</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Tissue Elasticity Score</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1 font-display">{st.elasticityScore} / 100</p>
        </div>
      </div>
    </div>
  );
};
