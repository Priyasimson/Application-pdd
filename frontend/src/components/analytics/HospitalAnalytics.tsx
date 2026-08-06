import React from 'react';

export const HospitalAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hospital Clinical Analytics & Intelligence</h2>
          <p className="text-xs text-slate-500">Surgical throughput, doctor performance, and AI accuracy metrics</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-xs">
          2026 Annual Cohort
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Surgeon Performance Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span>Dr. Sarah Jenkins (Senior Surgeon)</span>
              <span className="font-bold text-blue-600">142 Surgeries</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span>Dr. Emily Chen (Resident)</span>
              <span className="font-bold text-blue-600">68 Surgeries</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Accuracy Trend (nnUNet v2)</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span>Mandible Bone Segmentation</span>
              <span className="font-bold text-emerald-600">98.6%</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span>Pathology Tumor Boundary</span>
              <span className="font-bold text-emerald-600">96.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Implant Consumption</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span>2.0mm Titanium Plates</span>
              <span className="font-bold text-purple-600">310 Units</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span>2.4mm Locking Screws</span>
              <span className="font-bold text-purple-600">1,840 Screws</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
