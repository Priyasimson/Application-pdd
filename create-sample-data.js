import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirs = [
  path.join(__dirname, 'frontend', 'public', 'sample-data'),
  path.join(__dirname, 'sample-medical-data')
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Generate Authentic DICOM File (.dcm)
const createDcmFile = (filePath, patientName, studyDate) => {
  const buffer = Buffer.alloc(512);
  // 128-byte preamble (zeroed)
  // Bytes 128-131: "DICM"
  buffer.write('DICM', 128, 'ascii');
  // DICOM Tags: Patient Name, Modality (CT), Study Date
  buffer.write(`PATIENT_NAME:${patientName}|MODALITY:CT|STUDY_DATE:${studyDate}`, 132, 'utf8');
  fs.writeFileSync(filePath, buffer);
};

// 2. Generate Sample STL 3D Mesh File (.stl)
const createStlFile = (filePath, headerTitle) => {
  let content = `solid ${headerTitle}\n`;
  content += `  facet normal 0.0 0.0 1.0\n`;
  content += `    outer loop\n`;
  content += `      vertex 0.0 0.0 0.0\n`;
  content += `      vertex 10.0 0.0 0.0\n`;
  content += `      vertex 5.0 10.0 5.0\n`;
  content += `    endloop\n`;
  content += `  endfacet\n`;
  content += `endsolid ${headerTitle}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
};

// 3. Generate Patient Clinical Summary JSON
const createPatientJson = (filePath, patientData) => {
  fs.writeFileSync(filePath, JSON.stringify(patientData, null, 2), 'utf8');
};

targetDirs.forEach(dir => {
  createDcmFile(path.join(dir, 'CBCT_Mandible_HighRes_001.dcm'), 'Doe^John', '20260806');
  createDcmFile(path.join(dir, 'CT_Maxillofacial_Reconstruction_002.dcm'), 'Smith^Sarah', '20260805');
  createStlFile(path.join(dir, 'Mandibular_Reconstruction_3D_Model.stl'), 'MandibularDefectMesh');
  createStlFile(path.join(dir, 'Fibular_Free_Flap_Cutting_Guide.stl'), 'FibularFlapGuide');
  
  createPatientJson(path.join(dir, 'Patient_Clinical_Case_Report.json'), {
    patientId: "PAT-2026-8842",
    name: "John Doe",
    age: 48,
    gender: "Male",
    diagnosis: "Ameloblastoma of Right Mandibular Body",
    scanType: "CBCT 0.625mm High Resolution",
    tumorVolume: "14.2 cm³",
    recommendedFlap: "Fibula Free Flap (FFF)",
    fixationPlate: "Recon Locking Plate 2.4mm"
  });
});

console.log('✅ Sample Medical Data Files Generated Successfully in target directories!');
