import React, { useState, useRef } from 'react';
import { usePatient } from '../../context/PatientContext';
import { useAuth } from '../../context/AuthContext';

export const MedicalImageUpload: React.FC = () => {
  const { activePatient } = usePatient();
  const { addToast } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeScanName, setActiveScanName] = useState<string>('CBCT_Mandible_HighRes.dcm');
  const [activeScanSize, setActiveScanSize] = useState<string>('145.2 MB');
  const [windowPreset, setWindowPreset] = useState<'Bone' | 'SoftTissue' | 'Brain' | 'Lung'>('Bone');
  const [sliceIndex, setSliceIndex] = useState(160);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [noiseRemoval, setNoiseRemoval] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    setActiveScanName(file.name);
    setActiveScanSize(`${sizeInMB} MB`);
    addToast('success', 'File Uploaded Successfully', `Loaded "${file.name}" (${sizeInMB} MB) into DICOM Pipeline.`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".dcm,.zip,.stl,.obj,.ply,.png,.jpg,.jpeg,.json,.pdf,.nii,.nrrd"
        className="hidden"
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Medical Scan Upload & DICOM Viewer</h2>
          <p className="text-xs text-slate-500">Multi-slice CT, CBCT, MRI, DICOM, STL, OBJ, PLY processing pipeline</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium text-xs border border-blue-200 dark:border-blue-800">
            Active Scan: <strong>{activeScanName}</strong> ({activeScanSize})
          </span>
        </div>
      </div>

      {/* Upload Drag & Drop Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
            : 'border-slate-300 dark:border-slate-700 hover:border-blue-500'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center mx-auto text-2xl mb-3">
          📥
        </div>
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Drag & Drop CT / CBCT / MRI / DICOM / STL Files Here
        </h3>
        <p className="text-xs text-slate-500 mt-1">Supports multi-slice DICOM series (.dcm, .zip, .stl, .obj, .png) up to 2.5 GB</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-md shadow-blue-500/20"
        >
          Browse Local Files
        </button>
      </div>

      {/* DICOM Slice Viewer & Image Enhancement Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DICOM Canvas Slice Display */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-4 min-h-[450px] flex flex-col justify-between shadow-2xl relative">
          <div className="flex justify-between items-center z-10 text-xs text-slate-400">
            <span className="font-mono text-emerald-400 font-semibold">Slice: {sliceIndex} / 320</span>
            <span className="font-mono">Window Preset: {windowPreset}</span>
            <span className="font-mono text-slate-300">HU Range: {windowPreset === 'Bone' ? '+400 to +2000' : '-100 to +300'}</span>
          </div>

          {/* Interactive Slice Render */}
          <div className="my-auto flex flex-col items-center justify-center py-8">
            <div
              className="w-64 h-64 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-8xl shadow-2xl relative overflow-hidden"
              style={{
                filter: `contrast(${contrast}%) brightness(${brightness}%) ${noiseRemoval ? 'blur(0px)' : 'blur(0.5px)'}`
              }}
            >
              💀
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl pointer-events-none"></div>
              {/* Slice Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-blue-500/30"></div>
                <div className="h-full w-0.5 bg-blue-500/30 absolute"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-900">
            <span>Patient: <strong className="text-white">{activePatient.name}</strong></span>
            <span>Slice Thickness: <strong>0.625 mm</strong></span>
            <span>Scanner: <strong>Siemens SOMATOM Force</strong></span>
          </div>
        </div>

        {/* DICOM Window/Level & Contrast Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            Windowing & Image Enhancement
          </h3>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">Window/Level Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Bone', 'SoftTissue', 'Brain', 'Lung'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setWindowPreset(p)}
                  className={`py-2 px-3 rounded-lg font-bold border transition ${
                    windowPreset === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {p} Preset
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Axial Slice Index Slider</span>
                <span className="font-mono">{sliceIndex}</span>
              </div>
              <input
                type="range"
                min="1"
                max="320"
                value={sliceIndex}
                onChange={(e) => setSliceIndex(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Contrast ({contrast}%)</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Brightness ({brightness}%)</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">AI Noise Removal Filter</span>
              <button
                onClick={() => setNoiseRemoval(!noiseRemoval)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  noiseRemoval ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {noiseRemoval ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

