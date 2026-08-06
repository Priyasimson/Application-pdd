/**
 * ReconAI Modular Services & AI Pipeline Simulation Layer
 */

const ReconServices = {
  
  // Get active patient object
  getActivePatient: function() {
    return ReconData.patients.find(p => p.id === ReconData.activePatientId) || ReconData.patients[0];
  },

  // Unit Converter Engine (cm³ <-> mm³ <-> mL <-> m³)
  convertVolume: function(volumeCm3, targetUnit) {
    switch (targetUnit) {
      case 'mm³':
        return (volumeCm3 * 1000).toLocaleString() + ' mm³';
      case 'mL':
        return volumeCm3.toFixed(2) + ' mL';
      case 'm³':
        return (volumeCm3 / 1000000).toFixed(6) + ' m³';
      case 'cm³':
      default:
        return volumeCm3.toFixed(2) + ' cm³';
    }
  },

  // Dynamic Free Flap Scorer based on user-adjusted surgical parameters
  calculateFlapRecommendation: function(defectLengthMm, boneVolCm3, softTissueVolCm3) {
    const defectLengthCm = defectLengthMm / 10;
    
    return ReconData.freeFlaps.map(flap => {
      let score = 90;
      
      // Length constraint
      if (flap.maxBoneLength > 0 && flap.maxBoneLength < defectLengthCm) {
        score -= 40; // Exceeds max donor length
      } else if (flap.maxBoneLength > 0) {
        score += Math.min(10, (flap.maxBoneLength - defectLengthCm));
      }

      // Soft tissue volume match
      if (softTissueVolCm3 > 30 && flap.softTissueBulk === 'Thin / Pliable') {
        score -= 20;
      }

      // Pure soft tissue flap penalty for bone defect
      if (flap.maxBoneLength === 0 && defectLengthCm > 0) {
        score -= 50;
      }

      const finalScore = Math.max(15, Math.min(99, Math.round(score)));

      return {
        ...flap,
        score: finalScore,
        recommended: finalScore >= 85
      };
    }).sort((a, b) => b.score - a.score);
  },

  // Dynamic Surgical Removal Estimator
  calculateTissueRemoval: function(tumorVolCm3, marginCm) {
    // Spherical expansion approximation for margin buffer
    const radiusTumor = Math.cbrt((3 * tumorVolCm3) / (4 * Math.PI));
    const radiusTotal = radiusTumor + marginCm;
    const totalRemovalVolCm3 = (4 / 3) * Math.PI * Math.pow(radiusTotal, 3);
    
    // Remaining tissue approximation
    const safeMarginScore = marginCm >= 1.0 ? 'Safe' : marginCm >= 0.5 ? 'Warning' : 'Dangerous';
    const criticalNerveDistMm = Math.max(0.5, (10 - marginCm * 5)).toFixed(1);

    return {
      tumorVolume: tumorVolCm3,
      surgicalMarginCm: marginCm,
      totalRemovalVolCm3: parseFloat(totalRemovalVolCm3.toFixed(2)),
      totalRemovalVolM3: (totalRemovalVolCm3 / 1000000).toFixed(6),
      criticalNerveDistanceMm: criticalNerveDistMm,
      marginSafety: safeMarginScore,
      percentageRemoved: Math.min(100, Math.round((totalRemovalVolCm3 / (totalRemovalVolCm3 + 60)) * 100))
    };
  },

  // AI Pipeline Simulator (Emulates backend REST API endpoints)
  simulateAIService: {
    // /api/v1/segmentation
    runSegmentation: function(imageId, callback) {
      setTimeout(() => {
        callback({
          status: 'success',
          confidenceScore: 0.984,
          structures: ['Mandible', 'Maxilla', 'Tumor', 'Inferior Alveolar Nerve', 'Soft Tissue', 'Teeth', 'Sinus'],
          processingTimeMs: 420
        });
      }, 800);
    },

    // /api/v1/fixation-fea-stress
    runStressAnalysis: function(plateType, screwCount, callback) {
      setTimeout(() => {
        let maxStressMPa = plateType.includes('PSI') ? 240 : 380;
        let stabilityScore = plateType.includes('PSI') ? 98.5 : 84.0;
        callback({
          maxStressMPa: maxStressMPa,
          stabilityScore: stabilityScore,
          fatigueCycles: '10,000,000+',
          status: 'Optimal'
        });
      }, 600);
    },

    // /api/v1/chat-assistant
    askAssistant: function(prompt, patientId) {
      const patient = ReconServices.getActivePatient();
      const pLower = prompt.toLowerCase();

      if (pLower.includes('tissue') || pLower.includes('remove') || pLower.includes('margin')) {
        return `Based on AI segmentation for patient ${patient.name} (${patient.id}), the tumor volume is ${patient.tissueRemoval.tumorVolume} cm³. With a recommended 1.0 cm surgical margin, the estimated tissue removal volume is ${patient.tissueRemoval.totalRemovalVolume} cm³. Critical distance to the Inferior Alveolar Nerve is ${patient.tissueRemoval.criticalNerveDistance} mm.`;
      }
      if (pLower.includes('flap') || pLower.includes('donor') || pLower.includes('fibula')) {
        return `The AI Free Flap Recommender strongly suggests a **Fibula Free Flap** (Score: 96/100). The defect length is ${patient.boneMetrics.length} mm, requiring up to 8.0 cm of donor bone with dual-segment osteotomies and dental implant suitability.`;
      }
      if (pLower.includes('fixation') || pLower.includes('plate') || pLower.includes('screw')) {
        return `For this defect, a **Patient-Specific Titanium 3D Mesh / Plate (2.4mm)** with 8 monocortical/bicortical screws (2.0mm diameter) is recommended. It delivers uniform finite element load distribution with a mechanical stability score of 98.5%.`;
      }
      if (pLower.includes('risk') || pLower.includes('predict') || pLower.includes('complication')) {
        return `Overall surgical risk is LOW to MODERATE. Microvascular flap failure risk is 1.8%, plate fracture risk is 2.1%. Highest monitored risk is IAN Nerve Sensitivity (14.2%), which is mitigated by our AI surgical cutting guide.`;
      }

      return `AI Prediction Analysis: Patient ${patient.name} has a ${patient.diagnosis}. Bone quality score is ${patient.boneMetrics.qualityScore}/100 with density of ${patient.boneMetrics.density} HU. Surgical plan indicates low risk profile with high anatomical accuracy.`;
    }
  }
};
