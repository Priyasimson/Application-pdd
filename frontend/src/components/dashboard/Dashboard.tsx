import React from 'react';
import { usePatient } from '../../context/PatientContext';
import { useAuth } from '../../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { patients, setActivePatientId, setActiveModule } = usePatient();
  const { role } = useAuth();

  const METRICS = [
    { title: 'Total Patients', value: '1,240', sub: '+12% this month', icon: '👥', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' },
    { title: 'Today\'s Surgeries', value: '6', sub: '2 In Surgery • 4 Planned', icon: '📅', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' },
    { title: 'Pending Analysis', value: '3', sub: 'Segmentation running', icon: '⏳', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
    { title: 'Completed Reports', value: '960', sub: '100% Verified', icon: '✅', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30' },
    { title: 'Avg Bone Volume', value: '34.8 cm³', sub: 'Mandibular Cohort', icon: '🦴', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' },
    { title: 'Avg Soft Tissue', value: '41.2 cm³', sub: 'Envelope deficit', icon: '🩸', color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/30' },
    { title: 'Avg Removal Vol', value: '21.5 cm³', sub: 'Safety Margin 1.0cm', icon: '✂️', color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30' },
    { title: 'Avg Surgery Time', value: '4.2 hrs', sub: '-45m with AI PSI Guide', icon: '⏱️', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' },
    { title: 'AI Accuracy', value: '98.4%', sub: 'Dice Score: 0.958', icon: '🤖', color: 'text-blue-700 bg-blue-100 dark:bg-blue-900/50' },
    { title: 'Reconstruction Union', value: '96.2%', sub: 'Primary Bone Union', icon: '🏆', color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-900/50' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1e3a8a] p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-xs border border-blue-400/30">
              Hospital Clinical Suite v3.4
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-400/30">
              Active Role: {role}
            </span>
          </div>
          <h2 className="text-2xl font-bold font-display">Maxillofacial Reconstruction Command Center</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Real-time volumetric AI assessment, 3D digital twin planning, and osteosynthesis fixation modeling for Oral & Maxillofacial Surgeons.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveModule('patients')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/30"
          >
            + Add New Patient
          </button>
          <button
            onClick={() => setActiveModule('digital-twin')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/30"
          >
            🥽 Open Digital Twin
          </button>
        </div>
      </div>

      {/* 10 KPI Metric Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {METRICS.map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{m.title}</span>
              <span className={`p-2 rounded-lg text-sm ${m.color}`}>{m.icon}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white font-display">{m.value}</p>
            <span className="text-[10px] text-emerald-600 font-semibold">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Charts & Interactive Dashboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Monthly Reconstruction Surgeries</h3>
              <p className="text-xs text-slate-500">Free flap vs PSI fixation cases (2026)</p>
            </div>
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">Updated Live</span>
          </div>

          {/* Graphical Bars Simulation */}
          <div className="space-y-3 pt-2">
            {[
              { month: 'Jan', count: 42, pct: '70%' },
              { month: 'Feb', count: 58, pct: '85%' },
              { month: 'Mar', count: 64, pct: '92%' },
              { month: 'Apr', count: 71, pct: '98%' },
              { month: 'May', count: 83, pct: '100%' }
            ].map((d, i) => (
              <div key={i} className="flex items-center space-x-3 text-xs">
                <span className="w-8 font-mono text-slate-400">{d.month}</span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full" style={{ width: d.pct }}></div>
                </div>
                <span className="w-10 font-bold text-slate-700 dark:text-slate-300 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Free Flap Donor Selection Breakdown</h3>
              <p className="text-xs text-slate-500">Autologous bone & soft tissue flap usage</p>
            </div>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">Fibula Lead (52%)</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Fibula Free Flap (FFF)', pct: '52%', count: 48, color: 'bg-blue-600' },
              { name: 'Iliac Crest Flap (DCIA)', pct: '28%', count: 26, color: 'bg-emerald-500' },
              { name: 'Anterolateral Thigh (ALT)', pct: '14%', count: 13, color: 'bg-amber-500' },
              { name: 'Radial Forearm (RFF)', pct: '6%', count: 5, color: 'bg-purple-500' }
            ].map((f, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{f.name}</span>
                  <span className="font-mono text-slate-500">{f.pct} ({f.count} cases)</span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className={`${f.color} h-full rounded-full`} style={{ width: f.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Shortcuts Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Active Surgical Patients</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                <th className="p-2">Patient</th>
                <th className="p-2">Diagnosis</th>
                <th className="p-2">Defect Location</th>
                <th className="p-2">Bone Defect</th>
                <th className="p-2">Recommended Flap</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2 font-bold text-slate-900 dark:text-white">
                    {p.name} <span className="text-[10px] text-slate-400 block font-normal">{p.id}</span>
                  </td>
                  <td className="p-2 text-slate-700 dark:text-slate-300">{p.diagnosis}</td>
                  <td className="p-2 text-slate-600 dark:text-slate-400">{p.defectLocation}</td>
                  <td className="p-2 font-mono font-bold text-blue-600 dark:text-blue-400">{p.boneMetrics.defectVolume} cm³</td>
                  <td className="p-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-semibold">
                      Fibula Free Flap
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => {
                        setActivePatientId(p.id);
                        setActiveModule('reconstruction3d');
                      }}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-[11px]"
                    >
                      Inspect 3D →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
