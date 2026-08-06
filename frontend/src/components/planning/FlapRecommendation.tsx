import React, { useState } from 'react';
import { FLAP_RECOMMENDATIONS } from '../../services/mockData';
import { usePatient } from '../../context/PatientContext';

export const FlapRecommendation: React.FC = () => {
  const { activePatient } = usePatient();
  const [selectedFlap, setSelectedFlap] = useState(FLAP_RECOMMENDATIONS[0]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Free Flap Reconstruction Recommendation</h2>
          <p className="text-xs text-slate-500">Automated donor site selection & multi-parameter donor flap comparative matrix</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
          Target Defect: {activePatient.boneMetrics.length} mm (Segmental)
        </span>
      </div>

      {/* Flap Cards Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FLAP_RECOMMENDATIONS.map((f) => {
          const isSelected = f.type === selectedFlap.type;
          return (
            <button
              key={f.type}
              onClick={() => setSelectedFlap(f)}
              className={`p-5 rounded-2xl border text-left transition relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-900 to-slate-900 text-white border-blue-500 shadow-xl'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                  Rank #{f.rank}
                </span>
                <span className={`text-base font-extrabold ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {f.suitabilityScore}% Match
                </span>
              </div>
              <h3 className="font-bold text-sm leading-tight">{f.fullName}</h3>
              <p className={`text-[11px] mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                Max Bone Length: {f.maxBoneLength}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Flap Specifications Comparison */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 text-xs">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedFlap.fullName} Deep Dive</h3>
            <p className="text-xs text-slate-500">AI Suitability Score: {selectedFlap.suitabilityScore} / 100</p>
          </div>
          <button
            onClick={() => alert(`Selected ${selectedFlap.fullName} for patient surgical plan.`)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
          >
            Confirm & Select This Flap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Vascular Pedicle Length</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{selectedFlap.vascularPedicleLength}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Max Bone Harvest</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{selectedFlap.maxBoneLength}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Donor Site Morbidity</span>
            <span className="font-bold text-emerald-600">{selectedFlap.donorSiteMorbidity}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-slate-400 block text-[10px]">Reinnervation Potential</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{selectedFlap.reinnervationPotential}</span>
          </div>
        </div>

        {/* Advantages & Disadvantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Key Clinical Advantages</h4>
            <ul className="space-y-1.5 list-disc list-inside text-emerald-900 dark:text-emerald-200">
              {selectedFlap.advantages.map((adv, idx) => (
                <li key={idx}>{adv}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Clinical Considerations & Disadvantages</h4>
            <ul className="space-y-1.5 list-disc list-inside text-amber-900 dark:text-amber-200">
              {selectedFlap.disadvantages.map((dis, idx) => (
                <li key={idx}>{dis}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
