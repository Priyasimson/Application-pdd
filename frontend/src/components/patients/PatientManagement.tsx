import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { Patient } from '../../types';

export const PatientManagement: React.FC = () => {
  const { patients, activePatient, setActivePatientId, addPatient } = usePatient();
  const [filter, setFilter] = useState('');
  const [showRegModal, setShowRegModal] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);

  // Registration Form State
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(45);
  const [newGender, setNewGender] = useState('Male');
  const [newDiagnosis, setNewDiagnosis] = useState('Right Mandibular Ameloblastoma');

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.id.toLowerCase().includes(filter.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newP: Patient = {
      ...patients[0],
      id: `P-${Math.floor(10000 + Math.random() * 90000)}`,
      hospitalNo: `HOSP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      name: newName || 'New Patient',
      age: newAge,
      gender: newGender,
      diagnosis: newDiagnosis
    };
    addPatient(newP);
    setShowRegModal(false);
    setNewName('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Patient Registry & Medical Profiles</h2>
          <p className="text-xs text-slate-500">Manage maxillofacial surgical candidates, history, and AI metrics</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search patient, ID, diagnosis..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none w-full sm:w-64"
          />
          <button
            onClick={() => setShowRegModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-md shadow-blue-500/20 whitespace-nowrap"
          >
            + Register Patient
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left Patient List, Right Active Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Patient Roster ({filteredPatients.length})</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
            {filteredPatients.map((p) => {
              const isSelected = p.id === activePatient.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePatientId(p.id)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-200 font-medium'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs">{p.name}</span>
                    <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                      {p.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{p.diagnosis}</p>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400">
                    <span>{p.age} Y / {p.gender}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">Defect: {p.boneMetrics.defectVolume} cm³</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Banner Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                  👨‍⚕️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activePatient.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    ID: {activePatient.id} • Hosp No: {activePatient.hospitalNo}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowIdCard(!showIdCard)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold transition"
                >
                  🪪 Printable ID Card & QR
                </button>
              </div>
            </div>

            {/* Printable ID Card Drawer Modal */}
            {showIdCard && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-scaleUp">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Hospital Surgical ID Card</h4>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{activePatient.name}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Diagnosis: {activePatient.diagnosis}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Blood Group: {activePatient.bloodGroup} • Emergency: {activePatient.phone}</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-300 text-center">
                  <div className="w-20 h-20 bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] rounded">
                    QR CODE (VERIFIED)
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 block">SCAN FOR CT</span>
                </div>
              </div>
            )}

            {/* Medical Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Diagnosis</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{activePatient.diagnosis}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Defect Site</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{activePatient.defectLocation}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Allergies</span>
                <span className="font-bold text-rose-600">{activePatient.allergies}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Medications</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{activePatient.currentMedication}</span>
              </div>
            </div>
          </div>

          {/* Clinical Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Interactive Surgical Timeline</h4>
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {activePatient.timeline.map((t, idx) => (
                <div key={idx} className="flex items-start space-x-4 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow">
                    ✓
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex-1 text-xs">
                    <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">{t.date}</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 relative animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Register New Patient</h3>
              <button onClick={() => setShowRegModal(false)} className="text-slate-400 text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Hayes"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Diagnosis</label>
                <input
                  type="text"
                  value={newDiagnosis}
                  onChange={(e) => setNewDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md shadow-blue-500/20"
              >
                Create Patient Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
