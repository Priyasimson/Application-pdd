import React from 'react';

export const ComparativeAnalysis: React.FC = () => {
  const COMPARISON = [
    { method: 'Manual Freehand Planning', accuracy: '82.4%', dice: '0.782', sens: '80.1%', spec: '84.0%', time: '180 mins', status: 'Legacy Standard' },
    { method: 'CT-Based Conventional', accuracy: '91.2%', dice: '0.884', sens: '89.5%', spec: '92.1%', time: '90 mins', status: 'Standard' },
    { method: 'MRI-Based Soft Tissue', accuracy: '93.5%', dice: '0.912', sens: '94.0%', spec: '91.8%', time: '75 mins', status: 'High Perfusion' },
    { method: 'ReconAI Deep Neural Core', accuracy: '98.6%', dice: '0.958', sens: '98.2%', spec: '99.1%', time: '4.2 secs', status: 'AI State-of-the-Art', highlight: true }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Comparative Planning Performance Matrix</h2>
          <p className="text-xs text-slate-500">Benchmark comparison between Manual, CT, MRI, and ReconAI deep learning</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
          Dice Score: 0.958 (Best in Class)
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-x-auto text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <th className="p-3">Planning Methodology</th>
              <th className="p-3">Volumetric Accuracy</th>
              <th className="p-3">Dice Similarity (DSC)</th>
              <th className="p-3">Sensitivity</th>
              <th className="p-3">Specificity</th>
              <th className="p-3">Processing Duration</th>
              <th className="p-3">Clinical Benchmark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {COMPARISON.map((c, idx) => (
              <tr key={idx} className={c.highlight ? 'bg-blue-50/60 dark:bg-blue-900/30 font-bold text-blue-900 dark:text-blue-100' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}>
                <td className="p-3">{c.method}</td>
                <td className="p-3 font-mono">{c.accuracy}</td>
                <td className="p-3 font-mono">{c.dice}</td>
                <td className="p-3 font-mono">{c.sens}</td>
                <td className="p-3 font-mono">{c.spec}</td>
                <td className="p-3 font-mono">{c.time}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.highlight ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
