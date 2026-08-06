// ReconAI TypeScript Interfaces & Types Definition

export type UserRole =
  | 'Administrator'
  | 'Senior Surgeon'
  | 'Junior Surgeon'
  | 'Radiologist'
  | 'Researcher'
  | 'Nurse'
  | 'Receptionist'
  | 'Guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatar: string;
  department: string;
  mfaEnabled: boolean;
  phone: string;
}

export interface Patient {
  id: string;
  hospitalNo: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email?: string;
  diagnosis: string;
  disease: string;
  cancerStage: string;
  traumaType: string;
  defectLocation: string;
  affectedSide: string;
  medicalHistory: string;
  previousSurgery: string;
  currentMedication: string;
  allergies: string;
  smokingStatus: string;
  alcoholHistory: string;
  timeline: { date: string; event: string }[];
  boneMetrics: {
    volume: number; // cm3
    density: number; // HU
    height: number; // mm
    width: number; // mm
    thickness: number; // mm
    length: number; // mm
    surfaceArea: number; // cm2
    defectVolume: number; // cm3
    defectArea: number; // cm2
    remainingBonePercent: number;
    qualityScore: number;
    units: string;
  };
  softTissueMetrics: {
    volume: number; // cm3
    muscleThickness: number; // mm
    skinThickness: number; // mm
    fatThickness: number; // mm
    softTissueLoss: number; // cm3
    surfaceArea: number; // cm2
    coverageArea: number; // cm2
    elasticityScore: number;
    bloodSupply: string;
    edemaDetected: boolean;
    fibrosisDetected: boolean;
  };
  tissueRemoval: {
    tumorVolume: number; // cm3
    surgicalMargin: number; // cm
    totalRemovalVolume: number; // cm3
    remainingHealthyTissue: number; // %
    criticalNerveDistance: number; // mm
    maxDepth: number; // mm
    marginSafety: 'Safe' | 'Warning' | 'Dangerous';
  };
}

export interface FlapOption {
  type: string;
  fullName: string;
  rank: number;
  suitabilityScore: number; // 0 - 100
  maxBoneLength: string;
  vascularPedicleLength: string;
  reinnervationPotential: string;
  donorSiteMorbidity: string;
  healingTime: string;
  advantages: string[];
  disadvantages: string[];
}

export interface FixationSpecs {
  plateType: string;
  material: string;
  plateLengthMm: number;
  thicknessMm: number;
  screwCount: number;
  screwDiameterMm: number;
  mechanicalStabilityScore: number; // 0 - 100
  peakStressMpa: number;
  safetyFactor: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  geoInfo: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert';
  time: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
