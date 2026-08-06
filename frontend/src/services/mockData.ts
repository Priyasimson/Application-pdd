import type { Patient, UserRole, FlapOption, FixationSpecs, AuditEntry, NotificationItem } from '../types';

export const ROLES_LIST: { id: UserRole; name: string; title: string; avatar: string }[] = [
  { id: 'Senior Surgeon', name: 'Dr. Sarah Jenkins', title: 'Senior Oral & Maxillofacial Surgeon', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80' },
  { id: 'Administrator', name: 'Alex Rivera', title: 'Hospital IT System Administrator', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { id: 'Junior Surgeon', name: 'Dr. Emily Chen', title: 'Resident Maxillofacial Surgeon', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80' },
  { id: 'Radiologist', name: 'Dr. Marcus Vance', title: 'Head of Maxillofacial Radiology', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80' },
  { id: 'Researcher', name: 'Prof. David Thorne', title: 'Biomedical AI Research Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
  { id: 'Nurse', name: 'Sister Maria Santos', title: 'OR Nurse Coordinator', avatar: 'https://images.unsplash.com/photo-1594824813571-24a69c100417?auto=format&fit=crop&w=120&q=80' },
  { id: 'Receptionist', name: 'Clara Bennett', title: 'Patient Intake Specialist', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
  { id: 'Guest', name: 'Visiting Fellow', title: 'Surgical Observer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-88392',
    hospitalNo: 'HOSP-2026-88392',
    name: 'Robert Sterling',
    age: 54,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+1 (555) 234-5678',
    email: 'r.sterling@example.org',
    diagnosis: 'Mandibular Ameloblastoma (Right Segmental Defect)',
    disease: 'Ameloblastoma',
    cancerStage: 'Stage II (T2N0M0)',
    traumaType: 'Pathological Resection',
    defectLocation: 'Right Mandibular Body & Angle',
    affectedSide: 'Right',
    medicalHistory: 'Hypertension (Controlled), Type II Diabetes',
    previousSurgery: 'Incisional Biopsy (Right Mandible, 2026-05-12)',
    currentMedication: 'Metformin 500mg, Lisinopril 10mg',
    allergies: 'Penicillin',
    smokingStatus: 'Former Smoker (Quit 5 yrs ago)',
    alcoholHistory: 'Social Drinker',
    timeline: [
      { date: '2026-05-10', event: 'Initial Presentation & Panoramic Radiograph' },
      { date: '2026-05-12', event: 'Incisional Biopsy Confirmed Ameloblastoma' },
      { date: '2026-06-01', event: 'High-Resolution CBCT & Contrast CT Scan Uploaded' },
      { date: '2026-06-15', event: 'AI Volumetric Segmentation & 3D Reconstruction' },
      { date: '2026-07-28', event: 'Pre-operative Surgical Planning & Digital Twin Simulation' }
    ],
    boneMetrics: {
      volume: 38.4,
      density: 840,
      height: 32.5,
      width: 14.8,
      thickness: 4.2,
      length: 76.2,
      surfaceArea: 142.5,
      defectVolume: 18.6,
      defectArea: 48.2,
      remainingBonePercent: 51.5,
      qualityScore: 88,
      units: 'cm³'
    },
    softTissueMetrics: {
      volume: 42.1,
      muscleThickness: 12.4,
      skinThickness: 3.1,
      fatThickness: 4.5,
      softTissueLoss: 16.8,
      surfaceArea: 64.2,
      coverageArea: 58.0,
      elasticityScore: 82,
      bloodSupply: 'Good (Facial Artery Intact)',
      edemaDetected: false,
      fibrosisDetected: false
    },
    tissueRemoval: {
      tumorVolume: 12.4,
      surgicalMargin: 1.0,
      totalRemovalVolume: 22.8,
      remainingHealthyTissue: 68.4,
      criticalNerveDistance: 3.2,
      maxDepth: 28.6,
      marginSafety: 'Safe'
    }
  },
  {
    id: 'P-94012',
    hospitalNo: 'HOSP-2026-94012',
    name: 'Elena Rostova',
    age: 38,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '+1 (555) 876-5432',
    email: 'elena.rostova@example.org',
    diagnosis: 'Comminuted Maxillary Fracture (Complex Facial Trauma)',
    disease: 'Facial Trauma',
    cancerStage: 'N/A',
    traumaType: 'Motor Vehicle Collision (High Impact)',
    defectLocation: 'Left Maxilla & Zygomatic Arch',
    affectedSide: 'Left',
    medicalHistory: 'None',
    previousSurgery: 'Emergency Traumatic Stabilization (2026-07-10)',
    currentMedication: 'Analgesics (Ibuprofen 400mg)',
    allergies: 'None',
    smokingStatus: 'Non-Smoker',
    alcoholHistory: 'None',
    timeline: [
      { date: '2026-07-10', event: 'Emergency Intake & Multi-Slice Facial CT' },
      { date: '2026-07-12', event: 'AI 3D Fracture Fragment Mapping' },
      { date: '2026-07-18', event: 'PSI Fixation Plate Design Finalized' }
    ],
    boneMetrics: {
      volume: 42.1,
      density: 910,
      height: 28.1,
      width: 16.2,
      thickness: 3.8,
      length: 52.0,
      surfaceArea: 118.0,
      defectVolume: 14.2,
      defectArea: 36.5,
      remainingBonePercent: 66.2,
      qualityScore: 92,
      units: 'cm³'
    },
    softTissueMetrics: {
      volume: 38.6,
      muscleThickness: 10.8,
      skinThickness: 2.8,
      fatThickness: 3.9,
      softTissueLoss: 11.2,
      surfaceArea: 52.4,
      coverageArea: 48.1,
      elasticityScore: 90,
      bloodSupply: 'Excellent',
      edemaDetected: true,
      fibrosisDetected: false
    },
    tissueRemoval: {
      tumorVolume: 0.0,
      surgicalMargin: 0.5,
      totalRemovalVolume: 6.4,
      remainingHealthyTissue: 85.0,
      criticalNerveDistance: 4.8,
      maxDepth: 16.2,
      marginSafety: 'Safe'
    }
  }
];

export const FLAP_RECOMMENDATIONS: FlapOption[] = [
  {
    type: 'FFF',
    fullName: 'Fibula Free Flap (FFF)',
    rank: 1,
    suitabilityScore: 96,
    maxBoneLength: '25 - 30 cm',
    vascularPedicleLength: '12 - 14 cm',
    reinnervationPotential: 'High (Lateral Sural Cutaneous Nerve)',
    donorSiteMorbidity: 'Low (Full gait recovery in 3-4 weeks)',
    healingTime: '6 - 8 weeks',
    advantages: [
      'Bicortical bone strength allows dental osseointegration',
      'Extremely long bone length suitable for subtotal mandibulectomy',
      'Dual vascular pedicle (Peroneal artery & vein)',
      'Allows 2-team simultaneous harvesting & resection'
    ],
    disadvantages: [
      'Limited soft tissue skin paddle thickness',
      'Slight risk of peroneal nerve damage if harvested too high'
    ]
  },
  {
    type: 'DCIA',
    fullName: 'Iliac Crest Free Flap (DCIA)',
    rank: 2,
    suitabilityScore: 84,
    maxBoneLength: '8 - 10 cm',
    vascularPedicleLength: '6 - 8 cm',
    reinnervationPotential: 'Moderate',
    donorSiteMorbidity: 'Moderate-High (Temporary gait alteration & pain)',
    healingTime: '8 - 10 weeks',
    advantages: [
      'Natural anatomical curvature matches mandibular hemibody',
      'Substantial vertical bone height suitable for long implants',
      'Abundant internal oblique muscle for soft tissue cavity filling'
    ],
    disadvantages: [
      'Shorter vascular pedicle length',
      'Postoperative donor site pain and hernia risk'
    ]
  },
  {
    type: 'ALT',
    fullName: 'Anterolateral Thigh Flap (ALT)',
    rank: 3,
    suitabilityScore: 78,
    maxBoneLength: 'N/A (Soft Tissue Only)',
    vascularPedicleLength: '10 - 16 cm',
    reinnervationPotential: 'High (Lateral Femoral Cutaneous Nerve)',
    donorSiteMorbidity: 'Minimal',
    healingTime: '3 - 4 weeks',
    advantages: [
      'Pliable soft tissue envelope to cover massive tongue/floor defects',
      'Long vascular pedicle with low donor site complication'
    ],
    disadvantages: [
      'No structural bone support (Requires reconstruction plate spanning)'
    ]
  }
];

export const FIXATION_SPECS: FixationSpecs = {
  plateType: 'Synthes MatrixMANDIBLE 2.0mm Titanium Reconstruction Plate',
  material: 'Ti-6Al-4V Medical Grade Titanium Alloy',
  plateLengthMm: 110.0,
  thicknessMm: 2.0,
  screwCount: 6,
  screwDiameterMm: 2.4,
  mechanicalStabilityScore: 94,
  peakStressMpa: 142.5,
  safetyFactor: 2.4
};

export const MOCK_AUDIT_LOGS: AuditEntry[] = [
  { id: 'LOG-101', timestamp: '2026-08-02 11:45:12', user: 'Dr. Sarah Jenkins', role: 'Senior Surgeon', action: 'PATIENT_PROFILE_ACCESS', target: 'Patient Robert Sterling (P-88392)', ipAddress: '192.168.1.104', geoInfo: 'Hospital OR Suite 2' },
  { id: 'LOG-102', timestamp: '2026-08-02 11:30:05', user: 'Dr. Marcus Vance', role: 'Radiologist', action: 'CBCT_DICOM_UPLOAD', target: 'Scan DICOM_99302.dcm', ipAddress: '192.168.1.112', geoInfo: 'Radiology Imaging Lab' },
  { id: 'LOG-103', timestamp: '2026-08-02 10:15:40', user: 'Dr. Sarah Jenkins', role: 'Senior Surgeon', action: 'AI_VOLUMETRIC_CALCULATION', target: 'Mandible Segmental Defect', ipAddress: '192.168.1.104', geoInfo: 'Hospital OR Suite 2' },
  { id: 'LOG-104', timestamp: '2026-08-02 09:00:22', user: 'Alex Rivera', role: 'Administrator', action: 'SYSTEM_BACKUP_VERIFY', target: 'PostgreSQL Database Engine', ipAddress: '10.0.4.15', geoInfo: 'Hospital Data Center' }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'N1', title: 'AI Segmentation Complete', message: 'Mandible bone defect auto-calculated (98.6% confidence)', type: 'info', time: '10 mins ago', read: false },
  { id: 'N2', title: 'Nerve Margin Warning', message: 'Clearance to Inferior Alveolar Nerve is 2.8mm (Close safety threshold)', type: 'warning', time: '25 mins ago', read: false },
  { id: 'N3', title: 'Surgical Report Ready', message: 'Fibula free flap reconstruction report draft generated', type: 'info', time: '1 hour ago', read: true }
];
