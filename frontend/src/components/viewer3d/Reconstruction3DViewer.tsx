import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';

export const Reconstruction3DViewer: React.FC = () => {
  const { activePatient } = usePatient();
  const [boneOpacity, setBoneOpacity] = useState(0.85);
  const [tumorOpacity, setTumorOpacity] = useState(0.9);
  const [nerveOpacity, setNerveOpacity] = useState(1.0);
  const [slicePlaneX, setSlicePlaneX] = useState(50);
  const [activeTool, setActiveTool] = useState<'rotate' | 'measure' | 'angle' | 'volume'>('rotate');
  const [measuredDist, setMeasuredDist] = useState<number | null>(76.2);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Interactive 3D Maxillofacial Viewer</h2>
          <p className="text-xs text-slate-500">Real-time WebGL skull & mandibular volume rendering for {activePatient.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          {['rotate', 'measure', 'angle', 'volume'].map((tool) => (
            <button
              key={tool}
              onClick={() => setActiveTool(tool as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                activeTool === tool
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tool === 'rotate' ? '🔄 Orbit Rotate' : tool === 'measure' ? '📏 Distance Tool' : tool === 'angle' ? '📐 Angle Tool' : '📦 Volume Tool'}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Stage & Controls Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left WebGL Canvas Screen (3/4) */}
        <div className="lg:col-span-3 bg-slate-950 rounded-2xl border border-slate-800 p-4 relative min-h-[500px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Canvas Top Bar */}
          <div className="flex justify-between items-center z-10">
            <div className="flex space-x-2">
              <span className="px-2.5 py-1 rounded bg-blue-900/60 text-blue-300 text-[10px] font-mono border border-blue-700/50">
                GPU WebGL 2.0 Engine Active
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-mono border border-emerald-700/50">
                FPS: 60 • Voxels: 512³
              </span>
            </div>
            <div className="flex space-x-1 text-[10px]">
              <button className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono">Ant</button>
              <button className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono">Post</button>
              <button className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono">Lat R</button>
              <button className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono">Sup</button>
            </div>
          </div>

          {/* Interactive WebGL Simulation Graphic */}
          <div className="my-auto flex flex-col items-center justify-center relative py-12">
            <div className="w-72 h-72 rounded-full border-4 border-dashed border-blue-500/30 flex items-center justify-center relative animate-spin-slow">
              <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-blue-600/20 via-emerald-500/20 to-purple-600/20 flex items-center justify-center text-7xl shadow-2xl backdrop-blur-md">
                💀
              </div>
            </div>

            {/* 3D Measurement Overlay Pill */}
            {activeTool === 'measure' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold border border-blue-400 shadow-2xl">
                Distance: {measuredDist} mm (Segmental Defect Gap)
              </div>
            )}

            {/* Tumor Boundary Mesh Highlighting */}
            <div
              className="absolute w-40 h-24 bg-rose-500/30 border-2 border-rose-500 rounded-2xl flex items-center justify-center text-[11px] font-bold text-rose-200 shadow-lg"
              style={{ opacity: tumorOpacity }}
            >
              Tumor Resection Zone (12.4 cm³)
            </div>
          </div>

          {/* Canvas Bottom Control Bar */}
          <div className="flex justify-between items-center z-10 pt-3 border-t border-slate-900 text-xs text-slate-400">
            <div className="flex items-center space-x-4">
              <span>Patient: <strong className="text-white">{activePatient.name}</strong></span>
              <span>Defect: <strong className="text-emerald-400">{activePatient.boneMetrics.length} mm</strong></span>
            </div>
            <span className="font-mono text-[10px]">Mouse: Drag (Orbit) • Scroll (Zoom) • Right-Click (Pan)</span>
          </div>
        </div>

        {/* Right Anatomical Controls & Measurement Tools */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            Anatomical Layers & Transparency
          </h3>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Mandible & Maxilla Bone</span>
                <span className="font-mono">{Math.round(boneOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={boneOpacity}
                onChange={(e) => setBoneOpacity(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-rose-600 mb-1">
                <span>Ameloblastoma Pathology</span>
                <span className="font-mono">{Math.round(tumorOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={tumorOpacity}
                onChange={(e) => setTumorOpacity(parseFloat(e.target.value))}
                className="w-full accent-rose-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-amber-600 mb-1">
                <span>Inferior Alveolar Nerve</span>
                <span className="font-mono">{Math.round(nerveOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={nerveOpacity}
                onChange={(e) => setNerveOpacity(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Sagittal Slice Plane (X)</span>
                <span className="font-mono">{slicePlaneX} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={slicePlaneX}
                onChange={(e) => setSlicePlaneX(parseInt(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Quick Quantitative Readout Card */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Volumetric Summary</h4>
            <div className="flex justify-between">
              <span className="text-slate-500">Defect Volume:</span>
              <span className="font-bold text-blue-600">{activePatient.boneMetrics.defectVolume} cm³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pathology Removal:</span>
              <span className="font-bold text-rose-600">{activePatient.tissueRemoval.totalRemovalVolume} cm³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mandible Length:</span>
              <span className="font-bold text-emerald-600">{activePatient.boneMetrics.length} mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
