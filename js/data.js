/**
 * ReconAI Mock Data & Clinical Knowledge Base
 */

const ReconData = {
  // Current System State
  activePatientId: 'P-88392',
  currentUserRole: 'Oral Surgeon',
  currentUserName: 'Dr. Sarah Jenkins',
  
  // Roles Available
  roles: [
    { id: 'Oral Surgeon', name: 'Dr. Sarah Jenkins', title: 'Senior Oral & Maxillofacial Surgeon', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80' },
    { id: 'Radiologist', name: 'Dr. Marcus Vance', title: 'Head of Maxillofacial Radiology', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80' },
    { id: 'Administrator', name: 'Alex Rivera', title: 'Hospital IT System Administrator', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { id: 'Resident Doctor', name: 'Dr. Emily Chen', title: 'Maxillofacial Surgery Resident', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80' },
    { id: 'Researcher', name: 'Prof. David Thorne', title: 'Biomedical AI Research Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' }
  ],

  // Patients Registry
  patients: [
    {
      id: 'P-88392',
      hospitalNo: 'HOSP-2026-88392',
      name: 'Robert Sterling',
      age: 54,
      gender: 'Male',
      bloodGroup: 'O+',
      phone: '+1 (555) 234-5678',
      diagnosis: 'Mandibular Ameloblastoma (Right Segmental Defect)',
      disease: 'Ameloblastoma',
      cancerStage: 'Stage II (T2N0M0)',
      traumaType: 'Non-trauma (Pathological Resection)',
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
        { date: '2026-07-28', event: 'Pre-operative Surgical Planning & Digital Twin Cut' }
      ],
      boneMetrics: {
        volume: 38.4, // cm3
        density: 840, // HU
        height: 32.5, // mm
        width: 14.8, // mm
        thickness: 4.2, // mm
        length: 76.2, // mm
        surfaceArea: 142.5, // cm2
        defectVolume: 18.6, // cm3
        defectArea: 48.2, // cm2
        remainingBonePercent: 51.5,
        qualityScore: 88, // out of 100
        units: 'cm³'
      },
      softTissueMetrics: {
        volume: 42.1, // cm3
        muscleThickness: 12.4, // mm
        skinThickness: 3.1, // mm
        fatThickness: 4.5, // mm
        softTissueLoss: 16.8, // cm3
        surfaceArea: 64.2, // cm2
        coverageArea: 58.0, // cm2
        elasticityScore: 82,
        bloodSupply: 'Good (Facial Artery Intact)',
        edemaDetected: false,
        fibrosisDetected: false
      },
      tissueRemoval: {
        tumorVolume: 12.4, // cm3
        surgicalMargin: 1.0, // cm
        totalRemovalVolume: 22.8, // cm3
        remainingHealthyTissue: 68.4, // %
        criticalNerveDistance: 3.2, // mm to IAN
        maxDepth: 28.6, // mm
        marginSafety: 'Safe' // Safe | Warning | Dangerous
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
      diagnosis: 'Comminuted Maxillary Fracture (Complex Trauma)',
      disease: 'Facial Trauma',
      cancerStage: 'N/A',
      traumaType: 'Motor Vehicle Collision (High Impact)',
      defectLocation: 'Left Maxilla & Zygomatic Arch',
      affectedSide: 'Left',
      medicalHistory: 'None',
      previousSurgery: 'Emergency Tracheostomy',
      currentMedication: 'Cefazolin 1g IV',
      allergies: 'None',
      smokingStatus: 'Non-Smoker',
      alcoholHistory: 'None',
      timeline: [
        { date: '2026-07-20', event: 'Emergency Trauma Admission' },
        { date: '2026-07-20', event: 'Emergency Whole Skull CT Uploaded' },
        { date: '2026-07-22', event: 'AI Traumatic Fragment Segmentation' }
      ],
      boneMetrics: {
        volume: 29.2,
        density: 720,
        height: 28.1,
        width: 12.2,
        thickness: 3.5,
        length: 54.0,
        surfaceArea: 110.0,
        defectVolume: 11.4,
        defectArea: 32.0,
        remainingBonePercent: 60.9,
        qualityScore: 92,
        units: 'cm³'
      },
      softTissueMetrics: {
        volume: 31.0,
        muscleThickness: 9.8,
        skinThickness: 2.8,
        fatThickness: 3.2,
        softTissueLoss: 8.5,
        surfaceArea: 44.0,
        coverageArea: 40.0,
        elasticityScore: 90,
        bloodSupply: 'Excellent',
        edemaDetected: true,
        fibrosisDetected: false
      },
      tissueRemoval: {
        tumorVolume: 0.0,
        surgicalMargin: 0.5,
        totalRemovalVolume: 4.2,
        remainingHealthyTissue: 86.5,
        criticalNerveDistance: 6.8,
        maxDepth: 18.2,
        marginSafety: 'Safe'
      }
    },
    {
      id: 'P-77210',
      hospitalNo: 'HOSP-2026-77210',
      name: 'Arthur Pendelton',
      age: 67,
      gender: 'Male',
      bloodGroup: 'B-',
      phone: '+1 (555) 432-1098',
      diagnosis: 'Mandibular Osteosarcoma (Advanced Recurrence)',
      disease: 'Osteosarcoma',
      cancerStage: 'Stage III (T3N1M0)',
      traumaType: 'Non-trauma',
      defectLocation: 'Bilateral Anterior Mandible (Symphysis)',
      affectedSide: 'Bilateral',
      medicalHistory: 'Coronary Artery Disease, COPD',
      previousSurgery: 'Resection 2024, Chemotherapy',
      currentMedication: 'Aspirin, Salmeterol Inhaler',
      allergies: 'Sulfa Drugs',
      smokingStatus: 'Heavy Smoker (30 pack-years)',
      alcoholHistory: 'Moderate',
      timeline: [
        { date: '2026-06-11', event: 'Recurrence Confirmed via MRI & Pet-CT' },
        { date: '2026-07-02', event: 'Virtual Surgical Planning Initiated' }
      ],
      boneMetrics: {
        volume: 46.8,
        density: 610,
        height: 38.0,
        width: 16.5,
        thickness: 5.1,
        length: 92.4,
        surfaceArea: 180.2,
        defectVolume: 28.9,
        defectArea: 72.4,
        remainingBonePercent: 38.2,
        qualityScore: 64,
        units: 'cm³'
      },
      softTissueMetrics: {
        volume: 52.4,
        muscleThickness: 14.2,
        skinThickness: 3.6,
        fatThickness: 5.8,
        softTissueLoss: 29.4,
        surfaceArea: 88.0,
        coverageArea: 70.2,
        elasticityScore: 68,
        bloodSupply: 'Compromised (Previous Radiation)',
        edemaDetected: true,
        fibrosisDetected: true
      },
      tissueRemoval: {
        tumorVolume: 21.6,
        surgicalMargin: 1.5,
        totalRemovalVolume: 34.2,
        remainingHealthyTissue: 42.0,
        criticalNerveDistance: 1.1,
        maxDepth: 34.0,
        marginSafety: 'Dangerous'
      }
    }
  ],

  // Free Flap Options & Rules Engine
  freeFlaps: [
    {
      name: 'Fibula Free Flap',
      type: 'Vascularized Osseous / Osseocutaneous',
      maxBoneLength: 25.0, // cm
      boneVolumeSupport: 'High (Ideal for load-bearing mandible)',
      softTissueBulk: 'Moderate',
      pedicleLength: '12 - 14 cm',
      vesselDiameter: '2.5 - 3.0 mm',
      donorSiteMorbidity: 'Low (Walking preserved after recovery)',
      successRate: 97.4,
      score: 96,
      matchReason: 'Optimal bone length required (76.2mm) with high bicortical stability for dental implant rehabilitation.'
    },
    {
      name: 'Iliac Crest Flap (DCIA)',
      type: 'Osseomyocutaneous',
      maxBoneLength: 9.0, // cm
      boneVolumeSupport: 'Very High (Natural mandibular height curve)',
      softTissueBulk: 'High (Internal Oblique muscle)',
      pedicleLength: '6 - 8 cm',
      vesselDiameter: '2.0 - 2.5 mm',
      donorSiteMorbidity: 'Moderate (Abdominal hernia risk)',
      successRate: 94.2,
      score: 84,
      matchReason: 'Sufficient bone height, but shorter pedicle length and higher abdominal morbidity compared to Fibula.'
    },
    {
      name: 'Radial Forearm Free Flap (RFFF)',
      type: 'Fasciocutaneous / Osteocutaneous',
      maxBoneLength: 10.0, // cm
      boneVolumeSupport: 'Low (Thin cortical strip, non-load bearing)',
      softTissueBulk: 'Thin / Pliable',
      pedicleLength: '10 - 15 cm',
      vesselDiameter: '3.0 - 3.5 mm',
      donorSiteMorbidity: 'Moderate (Forearm scar, radial artery loss)',
      successRate: 98.1,
      score: 62,
      matchReason: 'Excellent soft tissue coverage, but insufficient bone thickness for primary mandibular segment reconstruction.'
    },
    {
      name: 'Anterolateral Thigh (ALT) Flap',
      type: 'Myocutaneous / Musculocutaneous',
      maxBoneLength: 0.0, // Soft tissue only
      boneVolumeSupport: 'None (Pure Soft Tissue)',
      softTissueBulk: 'High / Variable',
      pedicleLength: '12 - 16 cm',
      vesselDiameter: '2.0 - 3.0 mm',
      donorSiteMorbidity: 'Low',
      successRate: 96.8,
      score: 55,
      matchReason: 'Suitable only if soft tissue envelope defect exceeds 50cm³ without osseous requirement.'
    },
    {
      name: 'Scapular / Parascapular Flap',
      type: 'Osseocutaneous',
      maxBoneLength: 14.0, // cm
      boneVolumeSupport: 'Moderate',
      softTissueBulk: 'Variable',
      pedicleLength: '8 - 10 cm',
      vesselDiameter: '2.5 - 3.2 mm',
      donorSiteMorbidity: 'Low',
      successRate: 93.5,
      score: 78,
      matchReason: 'Allows independent movement of bone and soft tissue paddles, suitable for complex 3D composite defects.'
    }
  ],

  // Fixation Recommendation Engine
  fixationPlates: [
    {
      name: 'Patient-Specific Titanium 3D Mesh / Plate',
      type: 'PSI Custom 3D Printed',
      thickness: '2.4 mm',
      recommendedScrews: 8,
      screwDiameter: '2.0 mm',
      screwLength: '14 mm',
      mechanicalStabilityScore: 98.5,
      stressDistribution: 'Uniform FEA Load Dispersion',
      contourAccuracy: '100% Anatomical Pre-bent',
      recommended: true
    },
    {
      name: 'Locking Reconstruction Plate (MatrixMandible)',
      type: 'Reconstruction Plate',
      thickness: '2.7 mm',
      recommendedScrews: 6,
      screwDiameter: '2.4 mm',
      screwLength: '16 mm',
      mechanicalStabilityScore: 94.0,
      stressDistribution: 'High Stress Concentration at Bending Angles',
      contourAccuracy: 'Requires Intra-op Bending',
      recommended: false
    },
    {
      name: 'Mini Plate System (Dual Champy Line)',
      type: 'Mini Plate',
      thickness: '1.5 mm',
      recommendedScrews: 8,
      screwDiameter: '1.5 mm',
      screwLength: '8 mm',
      mechanicalStabilityScore: 72.0,
      stressDistribution: 'Sub-optimal for Segmental Defects (>5cm)',
      contourAccuracy: 'Flexible Hand Bending',
      recommended: false
    }
  ],

  // Method Comparison Data (Manual vs CT vs AI vs MRI)
  comparativeMethods: [
    {
      method: 'AI-Based Assessment (ReconAI)',
      diceScore: 0.942,
      accuracy: '98.4%',
      sensitivity: '97.2%',
      specificity: '98.9%',
      processingTime: '45 seconds',
      boneVolumeDiff: '± 0.2 cm³',
      softTissueDiff: '± 0.4 cm³'
    },
    {
      method: 'CT-Based Automated Segmentation',
      diceScore: 0.885,
      accuracy: '92.1%',
      sensitivity: '90.5%',
      specificity: '93.4%',
      processingTime: '12 minutes',
      boneVolumeDiff: '± 1.1 cm³',
      softTissueDiff: '± 2.5 cm³'
    },
    {
      method: 'MRI Soft Tissue Mapping',
      diceScore: 0.891,
      accuracy: '91.8%',
      sensitivity: '94.0%',
      specificity: '89.2%',
      processingTime: '25 minutes',
      boneVolumeDiff: '± 2.8 cm³',
      softTissueDiff: '± 0.8 cm³'
    },
    {
      method: 'Manual Surgeon Plan & Caliper',
      diceScore: 0.745,
      accuracy: '79.5%',
      sensitivity: '76.0%',
      specificity: '81.2%',
      processingTime: '140 minutes',
      boneVolumeDiff: '± 4.5 cm³',
      softTissueDiff: '± 6.2 cm³'
    }
  ],

  // Risk Prediction Breakdown
  riskPredictions: [
    { risk: 'Implant Non-Integration / Failure', percentage: 4.2, level: 'Low', advice: 'Ensure rigid bicortical primary stability and 3D printed PSI plate surface texturing.' },
    { risk: 'Fixation Plate Fracture', percentage: 2.1, level: 'Low', advice: 'Use 2.4mm PSI Titanium alloy with finite element stress dampening.' },
    { risk: 'Donor Bone Resorption', percentage: 6.8, level: 'Moderate', advice: 'Maintain periosteal vascular attachments and avoid thermal osteonecrosis during virtual cutting.' },
    { risk: 'Surgical Site Infection', percentage: 8.5, level: 'Moderate', advice: 'Administer intra-operative Cefazolin 2g and maintain strict aseptic intraoral closure.' },
    { risk: 'Inferior Alveolar Nerve Injury', percentage: 14.2, level: 'Elevated', advice: 'AI surgical guide preserves 3.2mm buffer zone above canal. Use piezoelectric cutter.' },
    { risk: 'Microvascular Flap Failure', percentage: 1.8, level: 'Low', advice: 'Pedicle length of 13.5cm matches right facial artery without kink angle.' }
  ],

  // System Security Audit Logs
  auditLogs: [
    { timestamp: '2026-07-31 17:42:10', user: 'Dr. Sarah Jenkins (Oral Surgeon)', action: '3D Virtual Bone Cut Simulation Executed', target: 'P-88392', ip: '192.168.1.104' },
    { timestamp: '2026-07-31 16:15:00', user: 'Dr. Marcus Vance (Radiologist)', action: 'CBCT DICOM Image Dataset Uploaded (512 slices)', target: 'P-88392', ip: '192.168.1.112' },
    { timestamp: '2026-07-31 14:30:22', user: 'Dr. Sarah Jenkins (Oral Surgeon)', action: 'Free Flap & Fixation Recommendation Generated', target: 'P-88392', ip: '192.168.1.104' },
    { timestamp: '2026-07-31 11:05:44', user: 'Alex Rivera (Administrator)', action: 'User Permissions Granted (Resident Doctor Role)', target: 'Dr. Emily Chen', ip: '192.168.1.200' },
    { timestamp: '2026-07-30 09:20:15', user: 'Prof. David Thorne (Researcher)', action: 'Comparative Analysis Model Benchmarking Exported', target: 'System Cohort', ip: '192.168.1.155' }
  ],

  // Database Schema Visualizer Specs (14 Tables)
  databaseTables: [
    { name: 'Users', count: 142, description: 'Surgeons, Radiologists, Administrators, Residents credentials & JWT sessions.' },
    { name: 'Patients', count: 1240, description: 'Patient demographic data, hospital records, medical history, allergies.' },
    { name: 'MedicalHistory', count: 3410, description: 'Prior surgeries, co-morbidities, cancer staging, trauma classifications.' },
    { name: 'MedicalImages', count: 8920, description: 'DICOM/CBCT/CT/MRI metadata, slice dimensions, HU calibrations, S3 URIs.' },
    { name: 'SegmentationResults', count: 4210, description: 'Multi-organ voxel masks (Mandible, Maxilla, Nerve, Tumor, Muscle).' },
    { name: 'BoneAnalysis', count: 2150, description: 'Calculated bone volumes (cm³), density (HU), defect measurements, quality scores.' },
    { name: 'SoftTissueAnalysis', count: 2150, description: 'Soft tissue thickness, loss %, elasticity score, vascularization indices.' },
    { name: 'TissueRemoval', count: 1840, description: 'Target surgical margins, resection volume, critical nerve clearance vectors.' },
    { name: 'FlapRecommendation', count: 1840, description: 'AI scoring for Fibula, DCIA, RFFF, ALT donor site matching parameters.' },
    { name: 'FixationRecommendation', count: 1840, description: 'PSI plate specs, screw placements, FEA stress concentration points.' },
    { name: 'RiskPrediction', count: 1840, description: 'Probabilistic risk scores for flap necrosis, non-union, infection, nerve injury.' },
    { name: 'Reports', count: 960, description: 'Generated hospital surgical report metadata, doctor signatures, PDF hashes.' },
    { name: 'Analytics', count: 12, description: 'Monthly surgical cohort metrics, complication tracking, average operating times.' },
    { name: 'AuditLogs', count: 48920, description: 'HIPAA compliant immutable activity trail, authentication logs, IP timestamps.' }
  ],

  // AI Frameworks Architecture
  aiModules: [
    { name: 'nnU-Net / MONAI', role: '3D Volumetric Organ & Tumor Segmentation', backend: 'PyTorch / CUDA' },
    { name: 'VTK & SimpleITK', role: 'Surface Extraction & Mesh Marching Cubes', backend: 'C++ / Python' },
    { name: 'YOLOv8-Medical', role: 'Anatomical Landmark & Inferior Alveolar Nerve Tracking', backend: 'TensorFlow / ONNX' },
    { name: 'PyTorch GNN (FEA)', role: 'Fixation Plate Stress Distribution & Biomechanical Stability', backend: 'PyTorch Geometric' },
    { name: 'Scikit-learn Ensemble', role: 'Clinical Risk Factor & Flap Matching Predictive Models', backend: 'Python Pipeline' }
  ]
};
