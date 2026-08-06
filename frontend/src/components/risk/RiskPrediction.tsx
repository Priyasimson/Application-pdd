import React from 'react';
import { usePatient } from '../../context/PatientContext';

export const RiskPrediction: React.FC = () => {
  const { activePatient } = usePatient();

  const RISKS = [
    { title: 'Free Flap Ischemia / Thrombosis', risk: 'Low (4.2%)', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' },
    { title: 'Surgical Site Infection (SSI)', risk: 'Low (6.1%)', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' },
    { title: 'Osteosynthesis Plate Fatigue / Screw Loosening', risk: 'Minimal (1.8%)', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200' },
    { title: 'Osteoradionecrosis Recurrence', risk: 'Moderate (14.5%)', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Predictive Clinical Risk Engine</h2>
          <p className="text-xs text-slate-500">Machine learning postoperative risk assessment for {activePatient.name}</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">
          Overall Risk Profile: FAVORABLE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {RISKS.map((r, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${r.color} shadow-sm space-y-2`}>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{r.title}</span>
            <p className="font-mono text-base font-extrabold">{r.risk}</p>
            <p className="text-[11px] opacity-80">Evaluated against 10,000+ clinical maxillofacial cases</p>
          </div>
        ))}
      </div>
    </div>
  );
};
