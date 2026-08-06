import React, { createContext, useContext, useState } from 'react';
import { Patient } from '../types';
import { MOCK_PATIENTS } from '../services/mockData';

interface PatientContextType {
  patients: Patient[];
  activePatient: Patient;
  activeModule: string;
  theme: 'light' | 'dark';
  language: string;
  isOffline: boolean;
  setActivePatientId: (id: string) => void;
  setActiveModule: (module: string) => void;
  updateMargin: (patientId: string, marginCm: number) => void;
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
  toggleOffline: () => void;
  addPatient: (newPatient: Patient) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [activePatientId, setActivePatientIdState] = useState<string>('P-88392');
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<string>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const activePatient = patients.find((p) => p.id === activePatientId) || patients[0];

  const setActivePatientId = (id: string) => {
    setActivePatientIdState(id);
  };

  const updateMargin = (patientId: string, marginCm: number) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          const tumorVol = p.tissueRemoval.tumorVolume;
          const totalRemoval = Number((tumorVol * Math.pow(1 + marginCm / 2, 2)).toFixed(1));
          const remainingPct = Number((51.5 - marginCm * 2.5).toFixed(1));
          const ianDistance = Number(Math.max(0.5, 4.2 - marginCm * 1.0).toFixed(1));
          const status = marginCm < 0.6 ? 'Dangerous' : marginCm < 1.0 ? 'Warning' : 'Safe';

          return {
            ...p,
            tissueRemoval: {
              ...p.tissueRemoval,
              surgicalMargin: marginCm,
              totalRemovalVolume: totalRemoval,
              remainingHealthyTissue: remainingPct,
              criticalNerveDistance: ianDistance,
              marginSafety: status
            }
          };
        }
        return p;
      })
    );
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleOffline = () => {
    setIsOffline((prev) => !prev);
  };

  const addPatient = (newPatient: Patient) => {
    setPatients((prev) => [newPatient, ...prev]);
    setActivePatientIdState(newPatient.id);
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        activePatient,
        activeModule,
        theme,
        language,
        isOffline,
        setActivePatientId,
        setActiveModule,
        updateMargin,
        toggleTheme,
        setLanguage,
        toggleOffline,
        addPatient
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error('usePatient must be used within a PatientProvider');
  return context;
};
