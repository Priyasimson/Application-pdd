import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';

export const AISegmentation: React.FC = () => {
  const { activePatient } = usePatient();
  const [layers, setLayers] = useState({
    mandible: true,
    maxilla: true,
    tumor: true,
    nerve: true,
    vessels: false,
    skin: false
  });
  const [brushMode, setBrushMode] = useState<'view' | 'add' | 'erase'>('view');

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Multi-Structure Segmentation</h2>
          <p className="text-xs text-slate-500">Automated nnUNet multi-class mask extraction with manual surgical brush editor</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-semibold text-xs border border-emerald-300 dark:border-emerald-700">
            Dice Score: 0.958 (High Precision)
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Screen Display */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-4 min-h-[450px] flex flex-col justify-between shadow-2xl relative">
          <div className="flex justify-between items-center z-10 text-xs text-slate-400">
            <span className="font-mono text-emerald-400">AI Confidence: 98.4%</span>
            <span className="font-mono">Active Tool: {brushMode.toUpperCase()}</span>
          </div>

          {/* Mask Render Area */}
          <div className="my-auto flex flex-col items-center justify-center relative py-10">
            <div className="w-64 h-64 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-8xl relative overflow-hidden shadow-2xl">
              💀
              {/* Layer Overlays */}
              {layers.mandible && (
                <div className="absolute inset-0 bg-blue-600/30 border-2 border-blue-500 rounded-2xl flex items-center justify-center text-xs font-bold text-blue-200 pointer-events-none">
                  Mandible Mask
                </div>
              )}
              {layers.tumor && (
                <div className="absolute w-28 h-20 bg-rose-600/50 border-2 border-rose-500 rounded-xl flex items-center justify-center text-[10px] font-bold text-white pointer-events-none">
                  Pathology
                </div>
              )}
              {layers.nerve && (
                <div className="absolute w-full h-1 bg-amber-400 bottom-16 pointer-events-none"></div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-900">
            <span>Patient: <strong className="text-white">{activePatient.name}</strong></span>
            <span>Manual Brush Mode: <strong className="text-blue-400">{brushMode}</strong></span>
          </div>
        </div>

        {/* Right Controls & Layer Toggles */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            Segmentation Mask Layers
          </h3>

          <div className="space-y-2">
            {[
              { key: 'mandible', label: 'Mandible Bone', color: 'bg-blue-600' },
              { key: 'maxilla', label: 'Maxilla Bone', color: 'bg-indigo-600' },
              { key: 'tumor', label: 'Ameloblastoma Pathology', color: 'bg-rose-600' },
              { key: 'nerve', label: 'Inferior Alveolar Nerve', color: 'bg-amber-500' },
              { key: 'vessels', label: 'Facial Vessels', color: 'bg-purple-600' },
              { key: 'skin', label: 'Soft Tissue Envelope', color: 'bg-teal-600' }
            ].map((layer) => (
              <div key={layer.key} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${layer.color}`}></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{layer.label}</span>
                </div>
                <button
                  onClick={() => toggleLayer(layer.key as any)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                    (layers as any)[layer.key] ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {(layers as any)[layer.key] ? 'Visible' : 'Hidden'}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Manual Mask Editing Brush</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setBrushMode('view')}
                className={`py-1.5 rounded font-bold transition ${brushMode === 'view' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                Inspect
              </button>
              <button
                onClick={() => setBrushMode('add')}
                className={`py-1.5 rounded font-bold transition ${brushMode === 'add' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                + Add Brush
              </button>
              <button
                onClick={() => setBrushMode('erase')}
                className={`py-1.5 rounded font-bold transition ${brushMode === 'erase' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                - Eraser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
