import React from 'react';
import { usePatient } from '../../context/PatientContext';

export const SurgicalPlanning: React.FC = () => {
  const { activePatient } = usePatient();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Surgical Plan & PSI Cutting Guide Specs</h2>
          <p className="text-xs text-slate-500">Comprehensive surgical workflow, blood loss estimation, and PSI guide export</p>
        </div>
        <button
          onClick={() => alert('Surgical Plan Approved and Locked for Operating Room.')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-md shadow-emerald-500/20"
        >
          Approve Surgical Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
            Resection Boundary & Patient-Specific Cutting Guide (PSI)
          </h3>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">Bone Resection Extent:</p>
            <p className="text-slate-600 dark:text-slate-400">
              Segmental mandibulectomy extending from the right canine (tooth #27) to the right condylar neck ({activePatient.boneMetrics.length} mm span).
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">PSI Cutting Guide Parameters:</p>
            <p className="text-slate-600 dark:text-slate-400">
              3D printed biocompatible Polyamide-12 guide with 2.4mm locking screw fixation slots. Margin clearance: {activePatient.tissueRemoval.surgicalMargin} cm.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
            Operative Estimates
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Estimated Surgery Time:</span>
              <span className="font-bold text-blue-600">4.5 Hours</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Estimated Blood Loss (EBL):</span>
              <span className="font-bold text-rose-600">350 mL</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Recovery Time:</span>
              <span className="font-bold text-emerald-600">6 Weeks</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500">Healing Prediction Score:</span>
              <span className="font-bold text-purple-600">92 / 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
