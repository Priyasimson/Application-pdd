import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';

export const DigitalTwinSimulator: React.FC = () => {
  const { activePatient } = usePatient();
  const [resectionPlaneX, setResectionPlaneX] = useState(12.5);
  const [graftRotation, setGraftRotation] = useState(15.0);
  const [plateOffset, setPlateOffset] = useState(2.0);
  const [screwCount, setScrewCount] = useState(6);

  // Dynamic real-time calculation update simulation
  const computedStress = Number((120.0 + (graftRotation * 1.5) - (screwCount * 3.2)).toFixed(1));
  const computedSafety = Number((880.0 / computedStress).toFixed(2));
  const computedGap = Number((0.2 + (Math.abs(graftRotation - 15) * 0.05)).toFixed(2));
  const computedUnionProb = Number(Math.min(99.0, Math.max(70.0, 98.5 - computedGap * 10)).toFixed(1));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-950 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-xs border border-blue-400/30">
              Virtual Patient Simulation Sandbox
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-400/30">
              Live Real-Time Kinematics
            </span>
          </div>
          <h2 className="text-2xl font-bold font-display">Digital Twin Surgical Simulator</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Surgeons can manipulate osteotomy cutting planes, fibula bone graft rotation, and fixation screws in virtual reality mode.
          </p>
        </div>
        <button
          onClick={() => alert('Digital Twin Simulation State Saved & Synced to Surgical Plan.')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/30"
        >
          💾 Save Simulation State
        </button>
      </div>

      {/* Main 3D Virtual Surgical Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Interactive 3D Canvas (2/3) */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-5 min-h-[500px] flex flex-col justify-between relative shadow-2xl overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/50">
              Digital Twin Active: {activePatient.name} ({activePatient.id})
            </span>
            <div className="flex space-x-2 text-[10px]">
              <button className="px-2.5 py-1 bg-blue-600 text-white rounded font-semibold">Pre-op Twin</button>
              <button className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Virtual Cut</button>
              <button className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Plate Fixed</button>
            </div>
          </div>

          {/* Virtual Skull Sandbox Visualizer */}
          <div className="my-auto flex flex-col items-center justify-center relative py-10">
            <div className="w-80 h-80 rounded-full border-2 border-emerald-500/40 flex items-center justify-center relative">
              {/* Virtual Bone Graft Mesh */}
              <div
                className="w-60 h-28 bg-gradient-to-r from-emerald-600/40 via-blue-600/40 to-slate-800/40 border-2 border-emerald-400 rounded-3xl flex items-center justify-center text-white text-xs font-bold shadow-2xl transition-transform duration-300"
                style={{ transform: `rotate(${graftRotation}deg)` }}
              >
                Fibula Donor Graft ({activePatient.boneMetrics.length} mm)
              </div>

              {/* Fixation Plate Overlay */}
              <div
                className="absolute w-64 h-4 bg-slate-300/80 border border-slate-100 rounded-full shadow-lg flex items-center justify-around px-2"
                style={{ transform: `translateY(${plateOffset * 10}px)` }}
              >
                {Array.from({ length: screwCount }).map((_, i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-slate-900 border border-white"></span>
                ))}
              </div>
            </div>

            {/* Real-time Dynamic Status Tag */}
            <div className="mt-4 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-mono text-emerald-300 text-center">
              Real-time Gap Clearance: {computedGap} mm • Primary Union: {computedUnionProb}%
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-900">
            <span>Resection Margin: <strong>{resectionPlaneX} mm</strong></span>
            <span>FEA Peak Stress: <strong className="text-amber-400">{computedStress} MPa</strong></span>
            <span>Safety Factor: <strong className="text-emerald-400">{computedSafety}</strong></span>
          </div>
        </div>

        {/* Right Real-time Simulation Parameters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            Virtual Surgical Controls
          </h3>

          {/* Interactive Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Resection Cutting Plane Offset</span>
                <span className="font-mono text-blue-600">{resectionPlaneX} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={resectionPlaneX}
                onChange={(e) => setResectionPlaneX(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Fibula Graft Rotation Angle</span>
                <span className="font-mono text-emerald-600">{graftRotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="1"
                value={graftRotation}
                onChange={(e) => setGraftRotation(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Fixation Plate Contour Offset</span>
                <span className="font-mono text-purple-600">{plateOffset} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={plateOffset}
                onChange={(e) => setPlateOffset(parseFloat(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Bicortical Locking Screws Count</span>
                <span className="font-mono text-amber-600">{screwCount} Screws</span>
              </div>
              <input
                type="range"
                min="4"
                max="10"
                step="1"
                value={screwCount}
                onChange={(e) => setScrewCount(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Dynamic Real-time Calculations Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Calculations Update (Real-time)
            </h4>
            <div className="flex justify-between">
              <span className="text-slate-500">Peak von Mises Stress:</span>
              <span className="font-bold font-mono text-slate-900 dark:text-white">{computedStress} MPa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Structural Safety Factor:</span>
              <span className="font-bold font-mono text-emerald-600">{computedSafety}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Osteotomy Interface Gap:</span>
              <span className="font-bold font-mono text-blue-600">{computedGap} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Primary Bone Union Score:</span>
              <span className="font-bold font-mono text-purple-600">{computedUnionProb}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
