import React from 'react';
import { usePatient } from '../../context/PatientContext';

export const BoneAnalysis: React.FC = () => {
  const { activePatient } = usePatient();
  const b = activePatient.boneMetrics;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Quantitative Bone Volumetric Analysis</h2>
          <p className="text-xs text-slate-500">Automated bone density (HU), defect metrics, and cortical thickness</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-xs">
          Bone Quality Score: {b.qualityScore} / 100
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Total Bone Volume</span>
          <p className="text-2xl font-bold text-blue-600 mt-1 font-display">{b.volume} {b.units}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Bone Density (HU)</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1 font-display">{b.density} HU</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Segmental Defect Volume</span>
          <p className="text-2xl font-bold text-rose-600 mt-1 font-display">{b.defectVolume} {b.units}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-slate-400 block">Remaining Healthy Bone</span>
          <p className="text-2xl font-bold text-purple-600 mt-1 font-display">{b.remainingBonePercent}%</p>
        </div>
      </div>

      {/* Dimensional Breakdown & Density Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
            Mandibular Anatomical Dimensions
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Defect Length:</span>
              <span className="font-bold text-slate-900 dark:text-white">{b.length} mm</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Vertical Bone Height:</span>
              <span className="font-bold text-slate-900 dark:text-white">{b.height} mm</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Buccolingual Width:</span>
              <span className="font-bold text-slate-900 dark:text-white">{b.width} mm</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Cortical Plate Thickness:</span>
              <span className="font-bold text-slate-900 dark:text-white">{b.thickness} mm</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
            Cortical & Trabecular Bone Density Heatmap
          </h3>
          <div className="h-40 rounded-xl bg-gradient-to-r from-blue-600 via-emerald-500 via-yellow-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-inner relative overflow-hidden">
            <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center">
              <p className="font-bold">HU Range Spectrum: -100 to +1800 HU</p>
              <p className="text-[11px] text-emerald-300 mt-1">D1 Cortical Bone (&gt;1250 HU) Intact At Symphysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
