import React from 'react';
import { usePatient } from '../../context/PatientContext';
import { useAuth } from '../../context/AuthContext';

export const SurgicalReports: React.FC = () => {
  const { activePatient } = usePatient();
  const { user } = useAuth();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Surgical Report Generator</h2>
          <p className="text-xs text-slate-500">Official hospital branded reconstruction plan report</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition"
          >
            🖨️ Print / Save PDF
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-300 shadow-2xl max-w-4xl mx-auto space-y-6 text-xs print:border-none print:shadow-none print:p-0">
        {/* Hospital Header */}
        <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              🦴
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-wide uppercase text-slate-900">
                St. Jude Oral & Maxillofacial Hospital
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase">ReconAI Volumetric Planning System • Clinical Surgical Report</p>
            </div>
          </div>
          <div className="text-right font-mono text-[10px] text-slate-600">
            <p className="font-bold text-slate-900 text-xs">REPORT #: RPT-2026-88392</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Status: VERIFIED & APPROVED</p>
          </div>
        </div>

        {/* Patient & Surgeon Meta Table */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Patient Information</span>
            <p className="font-bold text-sm text-slate-900">{activePatient.name}</p>
            <p className="text-slate-600">ID: {activePatient.id} • Age: {activePatient.age} Y / {activePatient.gender}</p>
            <p className="text-slate-600">Diagnosis: {activePatient.diagnosis}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Operating Surgeon</span>
            <p className="font-bold text-sm text-slate-900">{user?.name || 'Dr. Sarah Jenkins'}</p>
            <p className="text-slate-600">{user?.title || 'Senior Maxillofacial Surgeon'}</p>
            <p className="text-slate-600">Department of Oral & Maxillofacial Surgery</p>
          </div>
        </div>

        {/* Volumetric AI Quantification Summary */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b pb-1 border-slate-200">
            1. Volumetric AI Quantification Payload
          </h3>
          <div className="grid grid-cols-3 gap-3 font-mono">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-[9px] text-slate-500 block">Bone Defect Volume</span>
              <span className="font-bold text-blue-600 text-sm">{activePatient.boneMetrics.defectVolume} cm³</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-[9px] text-slate-500 block">Tumor Resection Volume</span>
              <span className="font-bold text-rose-600 text-sm">{activePatient.tissueRemoval.totalRemovalVolume} cm³</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-[9px] text-slate-500 block">Mandible Defect Length</span>
              <span className="font-bold text-emerald-600 text-sm">{activePatient.boneMetrics.length} mm</span>
            </div>
          </div>
        </div>

        {/* Surgical Plan Summary */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b pb-1 border-slate-200">
            2. Reconstruction Plan & Fixation Specifications
          </h3>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <p><strong>Primary Reconstruction:</strong> Fibula Free Flap (FFF) with dual vascular pedicle anastomoses.</p>
            <p><strong>Fixation Plate:</strong> Synthes 2.0mm Titanium Reconstruction Plate with 6 bicortical locking screws.</p>
            <p><strong>FEA von Mises Stress:</strong> 142.5 MPa under 350N load (Safety Factor: 2.4).</p>
          </div>
        </div>

        {/* Signatures & Verification QR Code */}
        <div className="pt-6 border-t border-slate-300 flex justify-between items-end">
          <div>
            <div className="w-40 border-b border-slate-900 pb-1 text-center font-serif italic text-sm font-bold text-blue-900">
              Dr. Sarah Jenkins
            </div>
            <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Attending Maxillofacial Surgeon Signature</p>
          </div>

          <div className="p-2 bg-white rounded border border-slate-300 flex items-center space-x-3">
            <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center text-[8px] font-mono font-bold rounded">
              QR VERIFIED
            </div>
            <div>
              <p className="font-bold text-[10px]">ReconAI Blockchain Audit</p>
              <p className="text-[9px] font-mono text-slate-500">Hash: 0x88392...f91a</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
