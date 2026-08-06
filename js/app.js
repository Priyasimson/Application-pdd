/**
 * ReconAI Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // App Core State
  let currentModule = 'dashboard';
  let threeEngine = null;
  let dicomViewer = null;
  let activeCharts = {};

  // Initialize UI & Bind Listeners
  initNavigation();
  initPatientSelector();
  initRoleSwitcher();
  initModals();
  initAIChat();
  
  // Load Default Module
  loadModule('dashboard');

  // -------------------------------------------------------------
  // MODULE ROUTER & RENDERING SYSTEM
  // -------------------------------------------------------------
  function loadModule(moduleName) {
    currentModule = moduleName;
    
    // Update Sidebar Active Class
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-module') === moduleName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const mainContainer = document.getElementById('mainContent');
    const patient = ReconServices.getActivePatient();

    // Destroy existing charts to prevent canvas reuse errors
    Object.values(activeCharts).forEach(chart => { if (chart) chart.destroy(); });
    activeCharts = {};

    switch (moduleName) {
      case 'dashboard':
        renderDashboard(mainContainer, patient);
        break;
      case 'patients':
        renderPatients(mainContainer);
        break;
      case 'imaging':
        renderImaging(mainContainer, patient);
        break;
      case 'segmentation':
        renderSegmentation(mainContainer, patient);
        break;
      case 'reconstruction3d':
        render3DViewerModule(mainContainer, patient);
        break;
      case 'bone-analysis':
        renderBoneAnalysis(mainContainer, patient);
        break;
      case 'soft-tissue':
        renderSoftTissueAnalysis(mainContainer, patient);
        break;
      case 'tissue-removal':
        renderTissueRemovalEstimator(mainContainer, patient);
        break;
      case 'margin-analysis':
        renderMarginAnalysis(mainContainer, patient);
        break;
      case 'flap-recommendation':
        renderFlapRecommendation(mainContainer, patient);
        break;
      case 'fixation':
        renderFixationRecommendation(mainContainer, patient);
        break;
      case 'surgical-planning':
        renderSurgicalPlanning(mainContainer, patient);
        break;
      case 'digital-twin':
        renderDigitalTwinSimulator(mainContainer, patient);
        break;
      case 'comparative':
        renderComparativeAnalysis(mainContainer);
        break;
      case 'risk-prediction':
        renderRiskPrediction(mainContainer, patient);
        break;
      case 'postop':
        renderPostOpAnalysis(mainContainer, patient);
        break;
      case 'reports':
        renderReports(mainContainer, patient);
        break;
      case 'analytics':
        renderAnalytics(mainContainer);
        break;
      case 'database':
        renderDatabaseSchema(mainContainer);
        break;
      default:
        renderDashboard(mainContainer, patient);
    }
  }

  // -------------------------------------------------------------
  // 1. DASHBOARD MODULE
  // -------------------------------------------------------------
  function renderDashboard(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Header Banner -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1e3a8a] p-6 rounded-2xl text-white shadow-xl">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-xs border border-blue-400/30">Hospital Clinical Suite v3.4</span>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-xs border border-emerald-400/30">nnUNet Core Active</span>
            </div>
            <h2 class="text-2xl font-bold font-display">Maxillofacial Reconstruction Command Center</h2>
            <p class="text-xs text-slate-300 mt-1 max-w-2xl">Real-time volumetric AI assessment, 3D digital twin planning, and osteosynthesis fixation modeling for Oral & Maxillofacial Surgeons.</p>
          </div>
          <div class="flex items-center space-x-3">
            <button onclick="window.location.hash='#patients'" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/30 flex items-center space-x-2">
              <i class="fa-solid fa-user-plus"></i>
              <span>Add New Patient</span>
            </button>
            <button onclick="window.location.hash='#digital-twin'" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/30 flex items-center space-x-2">
              <i class="fa-solid fa-vr-cardboard"></i>
              <span>Open Digital Twin</span>
            </button>
          </div>
        </div>

        <!-- 10 Metric Widgets Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Total Patients</span>
              <i class="fa-solid fa-users text-blue-600 bg-blue-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">1,240</p>
            <span class="text-[10px] text-emerald-600 font-semibold"><i class="fa-solid fa-arrow-trend-up"></i> +12% this month</span>
          </div>

          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Today's Cases</span>
              <i class="fa-solid fa-calendar-day text-emerald-600 bg-emerald-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">6</p>
            <span class="text-[10px] text-slate-500">2 In Surgery • 4 Planned</span>
          </div>

          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Pending Analysis</span>
              <i class="fa-solid fa-clock text-amber-600 bg-amber-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">3</p>
            <span class="text-[10px] text-amber-600 font-semibold">Segmentation processing</span>
          </div>

          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Completed Reconstructions</span>
              <i class="fa-solid fa-circle-check text-purple-600 bg-purple-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">960</p>
            <span class="text-[10px] text-purple-600 font-semibold">100% Verified</span>
          </div>

          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Avg Bone Volume</span>
              <i class="fa-solid fa-skull text-indigo-600 bg-indigo-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">34.8 <span class="text-xs text-slate-400">cm³</span></p>
            <span class="text-[10px] text-slate-500">Mandibular Cohort</span>
          </div>

          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Avg Soft Tissue</span>
              <i class="fa-solid fa-hand-holding-medical text-teal-600 bg-teal-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">41.2 <span class="text-xs text-slate-400">cm³</span></p>
            <span class="text-[10px] text-slate-500">Soft envelope loss</span>
          </div>

          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Avg Tissue Removal</span>
              <i class="fa-solid fa-scissors text-rose-600 bg-rose-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">21.5 <span class="text-xs text-slate-400">cm³</span></p>
            <span class="text-[10px] text-rose-600 font-semibold">Safety Margin 1.0cm</span>
          </div>

          <div class="medical-card p-4">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-semibold text-slate-600">Avg Surgery Duration</span>
              <i class="fa-solid fa-stopwatch text-cyan-600 bg-cyan-50 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-bold text-slate-900 font-display">4.2 <span class="text-xs text-slate-400">hrs</span></p>
            <span class="text-[10px] text-emerald-600 font-semibold">-45m with AI PSI Guide</span>
          </div>

          <div class="medical-card p-4 bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-bold text-blue-900">AI Accuracy</span>
              <i class="fa-solid fa-robot text-blue-600 bg-blue-100 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-extrabold text-blue-700 font-display">98.4%</p>
            <span class="text-[10px] text-blue-600 font-semibold">Dice Score: 0.942</span>
          </div>

          <div class="medical-card p-4 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
            <div class="flex items-center justify-between text-slate-400 mb-2">
              <span class="text-xs font-bold text-emerald-900">Reconstruction Success</span>
              <i class="fa-solid fa-award text-emerald-600 bg-emerald-100 p-2 rounded-lg text-sm"></i>
            </div>
            <p class="text-2xl font-extrabold text-emerald-700 font-display">96.2%</p>
            <span class="text-[10px] text-emerald-600 font-semibold">Primary Bone Union</span>
          </div>

        </div>

        <!-- Charts Section (Monthly Surgeries, Bone Trends, Flap Usage, Risk) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div class="medical-card p-5">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-bold text-sm text-slate-900">Monthly Reconstruction Surgeries</h3>
                <p class="text-xs text-slate-500">Free flap vs PSI fixation cases (2026)</p>
              </div>
              <span class="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-full">Updated Live</span>
            </div>
            <div class="h-64">
              <canvas id="monthlySurgeriesChart"></canvas>
            </div>
          </div>

          <div class="medical-card p-5">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-bold text-sm text-slate-900">Free Flap Selection Breakdown</h3>
                <p class="text-xs text-slate-500">Distribution of autologous donor sites</p>
              </div>
              <span class="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">Fibula Lead (52%)</span>
            </div>
            <div class="h-64 flex justify-center">
              <canvas id="flapDistributionChart"></canvas>
            </div>
          </div>

        </div>

        <!-- Recent Activity Feed & Upcoming Surgical Follow-ups -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div class="lg:col-span-2 medical-card p-5">
            <h3 class="font-bold text-sm text-slate-900 mb-4 flex items-center space-x-2">
              <i class="fa-solid fa-list-check text-blue-600"></i>
              <span>Recent Surgical Activities & Volumetric Logs</span>
            </h3>
            <div class="space-y-3">
              ${ReconData.auditLogs.slice(0, 4).map(log => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <i class="fa-solid fa-stethoscope"></i>
                    </div>
                    <div>
                      <p class="font-bold text-slate-800">${log.action}</p>
                      <p class="text-[10px] text-slate-500">${log.user} • Target: <span class="font-semibold text-slate-700">${log.target}</span></p>
                    </div>
                  </div>
                  <span class="text-[10px] text-slate-400 font-mono">${log.timestamp.split(' ')[1]}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="medical-card p-5">
            <h3 class="font-bold text-sm text-slate-900 mb-4 flex items-center space-x-2">
              <i class="fa-solid fa-calendar-check text-emerald-600"></i>
              <span>Upcoming Follow-ups</span>
            </h3>
            <div class="space-y-3 text-xs">
              <div class="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-bold text-slate-800">Robert Sterling (P-88392)</span>
                  <span class="px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 text-[10px] font-semibold">Tomorrow 09:00</span>
                </div>
                <p class="text-[10px] text-slate-600">3-Month Post-Op CT Evaluation & Dental Implant Check</p>
              </div>

              <div class="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-bold text-slate-800">Elena Rostova (P-94012)</span>
                  <span class="px-2 py-0.5 rounded bg-blue-200 text-blue-800 text-[10px] font-semibold">Aug 04, 11:30</span>
                </div>
                <p class="text-[10px] text-slate-600">Virtual Cutting Guide Verification & PSI Fitting</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    // Render Dashboard Charts
    setTimeout(() => {
      const ctxSurgeries = document.getElementById('monthlySurgeriesChart');
      if (ctxSurgeries) {
        activeCharts.surgeries = new Chart(ctxSurgeries, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              { label: 'Fibula Free Flaps', data: [24, 28, 32, 30, 38, 42, 45], backgroundColor: '#2563eb', borderRadius: 6 },
              { label: 'PSI Titanium Plates', data: [18, 22, 25, 28, 30, 35, 39], backgroundColor: '#10b981', borderRadius: 6 }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
      }

      const ctxFlaps = document.getElementById('flapDistributionChart');
      if (ctxFlaps) {
        activeCharts.flaps = new Chart(ctxFlaps, {
          type: 'doughnut',
          data: {
            labels: ['Fibula Free Flap', 'Iliac Crest (DCIA)', 'Radial Forearm (RFFF)', 'ALT Flap', 'Scapular Flap'],
            datasets: [{
              data: [52, 22, 12, 8, 6],
              backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
        });
      }
    }, 50);
  }

  // -------------------------------------------------------------
  // 2. PATIENT MANAGEMENT MODULE
  // -------------------------------------------------------------
  function renderPatients(container) {
    container.innerHTML = `
      <div class="space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold font-display text-slate-900">Patient Registry & Clinical Records</h2>
            <p class="text-xs text-slate-500">Manage patient demographics, cancer staging, trauma classifications, and surgical timeline history.</p>
          </div>
          <button id="addPatientModalBtn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center space-x-2 transition shadow-md shadow-blue-500/20">
            <i class="fa-solid fa-user-plus"></i>
            <span>Register New Patient</span>
          </button>
        </div>

        <!-- Search & Filter Bar -->
        <div class="medical-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="relative w-full sm:w-80">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
            <input type="text" id="patientSearchInput" placeholder="Search by name, ID, or diagnosis..." class="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
          </div>

          <div class="flex items-center space-x-3 w-full sm:w-auto">
            <select class="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium">
              <option>All Diagnoses</option>
              <option>Ameloblastoma</option>
              <option>Facial Trauma</option>
              <option>Osteosarcoma</option>
            </select>

            <select class="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium">
              <option>All Locations</option>
              <option>Mandible Right</option>
              <option>Maxilla Left</option>
              <option>Bilateral</option>
            </select>
          </div>
        </div>

        <!-- Patient Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${ReconData.patients.map(p => `
            <div class="medical-card p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] uppercase tracking-wider">${p.id}</span>
                  <span class="text-[10px] text-slate-400 font-mono">${p.hospitalNo}</span>
                </div>

                <h3 class="font-bold text-base text-slate-900">${p.name}</h3>
                <p class="text-xs text-slate-500">${p.age} Y • ${p.gender} • Blood: <span class="font-bold text-rose-600">${p.bloodGroup}</span></p>

                <div class="my-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <p class="font-bold text-slate-800 line-clamp-1"><i class="fa-solid fa-notes-medical text-blue-600 mr-1"></i> ${p.diagnosis}</p>
                  <p class="text-[11px] text-slate-600"><span class="font-semibold">Defect:</span> ${p.defectLocation}</p>
                  <p class="text-[11px] text-slate-600"><span class="font-semibold">Stage / Trauma:</span> ${p.cancerStage}</p>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button onclick="ReconApp.selectActivePatient('${p.id}')" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition">
                  Set Active Case
                </button>
                <button onclick="alert('Viewing Timeline for ${p.name}')" class="text-xs text-blue-600 hover:underline font-medium">
                  View Timeline <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // -------------------------------------------------------------
  // 3. MEDICAL IMAGE UPLOAD MODULE
  // -------------------------------------------------------------
  function renderImaging(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Medical Image Upload & DICOM Processing</h2>
          <p class="text-xs text-slate-500">Supports DICOM, CBCT, CT, MRI, X-Ray, STL, OBJ, PLY format multi-slice stacks with automated contrast enhancement.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Dropzone Uploader -->
          <div class="lg:col-span-1 medical-card p-6 flex flex-col justify-between">
            <div>
              <h3 class="font-bold text-sm text-slate-900 mb-2">Upload Scan Stack</h3>
              <div class="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 rounded-2xl p-6 text-center cursor-pointer transition">
                <i class="fa-solid fa-cloud-arrow-up text-4xl text-blue-600 mb-3 animate-bounce"></i>
                <p class="font-bold text-xs text-slate-800">Drag & Drop DICOM / CBCT / STL Files</p>
                <p class="text-[10px] text-slate-500 mt-1">or click to browse local hospital storage</p>
                <span class="inline-block mt-3 text-[10px] px-2 py-1 bg-white rounded-full text-slate-600 border border-slate-200">Max file size 2GB</span>
              </div>
            </div>

            <!-- Upload Controls & Enhancement Toggles -->
            <div class="mt-6 space-y-3 text-xs">
              <h4 class="font-bold text-slate-800">Automated Image Enhancement</h4>
              
              <label class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span class="font-medium text-slate-700">Noise Reduction Filter</span>
                <input type="checkbox" checked id="noiseFilterToggle" class="rounded text-blue-600 focus:ring-blue-500">
              </label>

              <label class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span class="font-medium text-slate-700">Window Level HU Calibration</span>
                <input type="checkbox" checked id="windowLevelToggle" class="rounded text-blue-600 focus:ring-blue-500">
              </label>

              <button onclick="alert('Running AI Automatic Enhancement...')" class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition shadow">
                Execute AI Noise Reduction
              </button>
            </div>
          </div>

          <!-- Interactive 2D DICOM Slice Viewer Canvas -->
          <div class="lg:col-span-2 medical-card p-5">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-bold text-sm text-slate-900">CBCT Slice Navigation Viewer</h3>
                <p class="text-xs text-slate-500">Patient: ${patient.name} (${patient.hospitalNo})</p>
              </div>
              <div class="flex items-center space-x-2 text-xs">
                <button id="resetSliceBtn" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold">Reset View</button>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div class="viewport-canvas mb-4 shadow-xl border border-slate-700">
                <canvas id="dicomCanvas"></canvas>
              </div>

              <!-- Slice Navigation Slider -->
              <div class="w-full max-w-lg space-y-2">
                <div class="flex justify-between text-xs text-slate-600 font-semibold">
                  <span>Slice Position</span>
                  <span id="sliceNumberDisplay">Slice 128 / 256</span>
                </div>
                <input type="range" id="sliceRange" min="1" max="256" value="128" class="w-full cursor-pointer">
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    // Instantiate DICOM Canvas Engine
    setTimeout(() => {
      dicomViewer = new ReconDICOMViewer('dicomCanvas');
      const sliceRange = document.getElementById('sliceRange');
      const sliceDisplay = document.getElementById('sliceNumberDisplay');
      
      if (sliceRange && dicomViewer) {
        sliceRange.addEventListener('input', (e) => {
          const sliceVal = parseInt(e.target.value);
          dicomViewer.setSlice(sliceVal);
          if (sliceDisplay) sliceDisplay.innerText = `Slice ${sliceVal} / 256`;
        });
      }
    }, 50);
  }

  // -------------------------------------------------------------
  // 4. AI IMAGE SEGMENTATION MODULE
  // -------------------------------------------------------------
  function renderSegmentation(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold font-display text-slate-900">AI Automatic Image Segmentation</h2>
            <p class="text-xs text-slate-500">Multi-organ deep learning segmentation using nnU-Net architecture with interactive manual brush refinement.</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Confidence Score: 98.4%</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Detected Structures & Manual Brush Tools -->
          <div class="medical-card p-5 space-y-4">
            <h3 class="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Automatically Detected Structures</h3>
            
            <div class="space-y-2 text-xs">
              <label class="flex items-center justify-between p-2 rounded bg-slate-50">
                <span class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span class="font-semibold text-slate-800">Mandible Bone</span>
                </span>
                <span class="text-slate-500 font-mono">99.1%</span>
              </label>

              <label class="flex items-center justify-between p-2 rounded bg-slate-50">
                <span class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span class="font-semibold text-slate-800">Ameloblastoma Tumor</span>
                </span>
                <span class="text-slate-500 font-mono">97.8%</span>
              </label>

              <label class="flex items-center justify-between p-2 rounded bg-slate-50">
                <span class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span class="font-semibold text-slate-800">Inferior Alveolar Nerve</span>
                </span>
                <span class="text-slate-500 font-mono">96.5%</span>
              </label>

              <label class="flex items-center justify-between p-2 rounded bg-slate-50">
                <span class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-blue-400"></span>
                  <span class="font-semibold text-slate-800">Soft Tissue Envelope</span>
                </span>
                <span class="text-slate-500 font-mono">98.2%</span>
              </label>
            </div>

            <div class="pt-4 border-t border-slate-100 space-y-3">
              <h4 class="font-bold text-xs text-slate-900">Manual Editing Tools</h4>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <button id="toolBrush" class="py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                  <i class="fa-solid fa-paintbrush mr-1"></i> Brush Tool
                </button>
                <button id="toolErase" class="py-2 bg-slate-200 text-slate-800 font-bold rounded-lg hover:bg-slate-300 transition">
                  <i class="fa-solid fa-eraser mr-1"></i> Erase Tool
                </button>
              </div>
              <button id="clearMasksBtn" class="w-full py-1.5 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded text-xs font-semibold">
                Clear Manual Adjustments
              </button>
            </div>
          </div>

          <!-- Segmentation Canvas -->
          <div class="lg:col-span-2 medical-card p-5 flex flex-col items-center">
            <div class="viewport-canvas shadow-xl border border-slate-700">
              <canvas id="segCanvas"></canvas>
            </div>
            <p class="text-[11px] text-slate-500 mt-3">Click and drag on the canvas with Brush Tool active to manually refine tumor boundary masks.</p>
          </div>

        </div>
      </div>
    `;

    setTimeout(() => {
      dicomViewer = new ReconDICOMViewer('segCanvas');
      dicomViewer.activeTool = 'brush';

      document.getElementById('toolBrush')?.addEventListener('click', () => {
        if (dicomViewer) dicomViewer.activeTool = 'brush';
      });
      document.getElementById('toolErase')?.addEventListener('click', () => {
        if (dicomViewer) dicomViewer.activeTool = 'erase';
      });
      document.getElementById('clearMasksBtn')?.addEventListener('click', () => {
        if (dicomViewer) dicomViewer.clearMasks();
      });
    }, 50);
  }

  // -------------------------------------------------------------
  // 5. 3D RECONSTRUCTION VIEWER MODULE
  // -------------------------------------------------------------
  function render3DViewerModule(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold font-display text-slate-900">Interactive 3D Anatomical Reconstruction</h2>
            <p class="text-xs text-slate-500">Real-time WebGL 3D mesh rendering with orbit controls, transparency sliders, and 3D distance/volume measurement tools.</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Three.js Engine</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <!-- 3D Controls Sidebar -->
          <div class="lg:col-span-1 medical-card p-5 space-y-4 text-xs">
            <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-2">Tissue Layer Controls</h3>

            <div class="space-y-3">
              <div>
                <label class="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Mandible Bone Opacity</span>
                  <span id="boneOpacityVal">100%</span>
                </label>
                <input type="range" id="boneOpacityRange" min="0" max="100" value="100" class="w-full">
              </div>

              <div>
                <label class="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Soft Tissue Envelope Opacity</span>
                  <span id="softOpacityVal">25%</span>
                </label>
                <input type="range" id="softOpacityRange" min="0" max="100" value="25" class="w-full">
              </div>

              <div>
                <label class="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Tumor Volume Opacity</span>
                  <span id="tumorOpacityVal">85%</span>
                </label>
                <input type="range" id="tumorOpacityRange" min="0" max="100" value="85" class="w-full">
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 space-y-2">
              <h4 class="font-bold text-slate-900">View Transformations</h4>
              
              <button id="toggleExplodedBtn" class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition">
                Toggle Exploded Assembly View
              </button>

              <button onclick="alert('3D Distance Tool Active: Click two points on 3D bone mesh.')" class="w-full py-2 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-lg hover:bg-blue-100 transition">
                <i class="fa-solid fa-ruler"></i> 3D Distance Tool (mm)
              </button>
            </div>
          </div>

          <!-- WebGL 3D Viewport -->
          <div class="lg:col-span-3 medical-card p-2 flex flex-col">
            <div id="threeDViewport" class="viewport-canvas w-full h-[520px] rounded-xl overflow-hidden shadow-inner"></div>
            <div class="p-2 flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Orbit: Left Click Drag | Pan: Right Click Drag | Zoom: Mouse Scroll</span>
              <span>Patient Defect: Right Mandibular Body (76.2 mm)</span>
            </div>
          </div>

        </div>
      </div>
    `;

    setTimeout(() => {
      threeEngine = new Recon3DEngine('threeDViewport');

      let isExploded = false;
      document.getElementById('toggleExplodedBtn')?.addEventListener('click', () => {
        isExploded = !isExploded;
        if (threeEngine) threeEngine.toggleExplodedView(isExploded);
      });

      document.getElementById('boneOpacityRange')?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('boneOpacityVal').innerText = val + '%';
        if (threeEngine) threeEngine.setLayerOpacity('bone', val / 100);
      });

      document.getElementById('softOpacityRange')?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('softOpacityVal').innerText = val + '%';
        if (threeEngine) threeEngine.setLayerOpacity('softTissue', val / 100);
      });
    }, 50);
  }

  // -------------------------------------------------------------
  // 6. BONE ANALYSIS MODULE
  // -------------------------------------------------------------
  function renderBoneAnalysis(container, patient) {
    const b = patient.boneMetrics;
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold font-display text-slate-900">Quantitative Bone Volumetric Analysis</h2>
            <p class="text-xs text-slate-500">Calculates total bone volume, Hounsfield Unit density, defect volume, remaining bone %, and structural quality scores.</p>
          </div>
          <div class="flex items-center space-x-2 text-xs">
            <span class="font-semibold text-slate-600">Unit Switcher:</span>
            <select id="boneUnitSelect" class="px-3 py-1 bg-white border border-slate-300 rounded font-bold">
              <option value="cm³">cm³</option>
              <option value="mm³">mm³</option>
              <option value="mL">mL</option>
              <option value="m³">m³</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="medical-card p-4">
            <p class="text-xs font-semibold text-slate-500">Total Bone Volume</p>
            <p class="text-2xl font-bold text-slate-900 font-display mt-1" id="valBoneVol">${b.volume} cm³</p>
            <span class="text-[10px] text-emerald-600 font-semibold">Anatomical Baseline</span>
          </div>

          <div class="medical-card p-4">
            <p class="text-xs font-semibold text-slate-500">Bone Defect Volume</p>
            <p class="text-2xl font-bold text-rose-600 font-display mt-1" id="valDefectVol">${b.defectVolume} cm³</p>
            <span class="text-[10px] text-rose-600 font-semibold">Requires Resection Graft</span>
          </div>

          <div class="medical-card p-4">
            <p class="text-xs font-semibold text-slate-500">Bone Density (HU)</p>
            <p class="text-2xl font-bold text-blue-600 font-display mt-1">${b.density} HU</p>
            <span class="text-[10px] text-blue-600 font-semibold">Type II Cortical Bone</span>
          </div>

          <div class="medical-card p-4">
            <p class="text-xs font-semibold text-slate-500">Bone Quality Score</p>
            <p class="text-2xl font-bold text-purple-600 font-display mt-1">${b.qualityScore} / 100</p>
            <span class="text-[10px] text-purple-600 font-semibold">Excellent Primary Stability</span>
          </div>

        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="medical-card p-5 space-y-3 text-xs">
            <h3 class="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Detailed Anatomical Dimensions</h3>
            
            <div class="flex justify-between py-1 border-b border-slate-50">
              <span class="text-slate-600">Defect Span Length:</span>
              <span class="font-bold text-slate-900">${b.length} mm</span>
            </div>

            <div class="flex justify-between py-1 border-b border-slate-50">
              <span class="text-slate-600">Mandibular Height:</span>
              <span class="font-bold text-slate-900">${b.height} mm</span>
            </div>

            <div class="flex justify-between py-1 border-b border-slate-50">
              <span class="text-slate-600">Bucco-Lingual Width:</span>
              <span class="font-bold text-slate-900">${b.width} mm</span>
            </div>

            <div class="flex justify-between py-1 border-b border-slate-50">
              <span class="text-slate-600">Cortical Plate Thickness:</span>
              <span class="font-bold text-slate-900">${b.thickness} mm</span>
            </div>

            <div class="flex justify-between py-1">
              <span class="text-slate-600">Remaining Bone Percentage:</span>
              <span class="font-bold text-emerald-600">${b.remainingBonePercent}%</span>
            </div>
          </div>

          <!-- Color Heatmap Visualizer -->
          <div class="medical-card p-5">
            <h3 class="font-bold text-sm text-slate-900 mb-3">Bone Density Color Heat Map</h3>
            <div class="h-44 rounded-xl bone-heatmap flex items-end p-4 text-white shadow-inner">
              <div class="bg-slate-900/80 p-3 rounded-lg backdrop-blur-sm text-xs">
                <p class="font-bold">Density Distribution Spectrum</p>
                <p class="text-[10px] text-slate-300">Green: High Density (1000 HU) • Yellow: Medium • Red: Defect/Lytic Zone (150 HU)</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    document.getElementById('boneUnitSelect')?.addEventListener('change', (e) => {
      const unit = e.target.value;
      document.getElementById('valBoneVol').innerText = ReconServices.convertVolume(b.volume, unit);
      document.getElementById('valDefectVol').innerText = ReconServices.convertVolume(b.defectVolume, unit);
    });
  }

  // -------------------------------------------------------------
  // 7. SOFT TISSUE ANALYSIS MODULE
  // -------------------------------------------------------------
  function renderSoftTissueAnalysis(container, patient) {
    const st = patient.softTissueMetrics;
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Soft Tissue & Envelope Volumetric Analysis</h2>
          <p class="text-xs text-slate-500">Estimates muscle, skin, fat layer thickness, soft tissue loss, and vascularization parameters.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="medical-card p-5">
            <p class="text-xs font-semibold text-slate-500">Total Soft Tissue Volume</p>
            <p class="text-2xl font-bold text-teal-600 font-display mt-1">${st.volume} cm³</p>
            <span class="text-[10px] text-slate-500">Masseter & Pterygoid Envelope</span>
          </div>

          <div class="medical-card p-5">
            <p class="text-xs font-semibold text-slate-500">Soft Tissue Defect Loss</p>
            <p class="text-2xl font-bold text-rose-600 font-display mt-1">${st.softTissueLoss} cm³</p>
            <span class="text-[10px] text-rose-600 font-semibold">Requires Myocutaneous Bulk</span>
          </div>

          <div class="medical-card p-5">
            <p class="text-xs font-semibold text-slate-500">Tissue Elasticity Score</p>
            <p class="text-2xl font-bold text-emerald-600 font-display mt-1">${st.elasticityScore} / 100</p>
            <span class="text-[10px] text-emerald-600 font-semibold">High Mucosal Compliance</span>
          </div>
        </div>

        <div class="medical-card p-5 space-y-4 text-xs">
          <h3 class="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Tissue Layer Breakdown & Vascular Status</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-3 bg-slate-50 rounded-lg">
              <span class="text-slate-500">Muscle Layer Thickness:</span>
              <p class="font-bold text-sm text-slate-800">${st.muscleThickness} mm</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-lg">
              <span class="text-slate-500">Subcutaneous Fat Thickness:</span>
              <p class="font-bold text-sm text-slate-800">${st.fatThickness} mm</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-lg">
              <span class="text-slate-500">Skin Dermal Thickness:</span>
              <p class="font-bold text-sm text-slate-800">${st.skinThickness} mm</p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <i class="fa-solid fa-heart-pulse text-blue-600 text-xl"></i>
              <div>
                <p class="font-bold text-slate-900">Vascular Pedicle Status</p>
                <p class="text-[10px] text-slate-600">${st.bloodSupply}</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[10px]">Optimal Perfusion</span>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 8. TISSUE REMOVAL ESTIMATION MODULE
  // -------------------------------------------------------------
  function renderTissueRemovalEstimator(container, patient) {
    const tr = patient.tissueRemoval;
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Tissue Removal & Surgical Margin Estimator</h2>
          <p class="text-xs text-slate-500">Simulate pathological tissue resection volume by selecting safety margin clearances (0.5cm - 2.0cm).</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Controls Panel -->
          <div class="medical-card p-5 space-y-4 text-xs">
            <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-2">Pathological Markup Parameters</h3>

            <div>
              <label class="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Selected Surgical Margin</span>
                <span id="marginValDisplay" class="font-bold text-blue-600">${tr.surgicalMargin} cm</span>
              </label>
              <input type="range" id="surgicalMarginRange" min="0.5" max="2.0" step="0.1" value="${tr.surgicalMargin}" class="w-full">
            </div>

            <div class="p-3 bg-slate-50 rounded-lg space-y-2">
              <div class="flex justify-between">
                <span class="text-slate-600">Tumor Base Volume:</span>
                <span class="font-bold">${tr.tumorVolume} cm³</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600">Calculated Removal Volume:</span>
                <span class="font-bold text-rose-600" id="totalRemovalDisplay">${tr.totalRemovalVolume} cm³</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600">Remaining Healthy Tissue:</span>
                <span class="font-bold text-emerald-600">${tr.remainingHealthyTissue}%</span>
              </div>
            </div>
          </div>

          <!-- 3D Resection Visualizer Preview -->
          <div class="lg:col-span-2 medical-card p-5 flex flex-col justify-between">
            <h3 class="font-bold text-sm text-slate-900 mb-2">Simulated Resection Envelope</h3>
            
            <div class="p-6 rounded-xl bg-slate-900 text-white space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-400">Critical Structure Proximity:</span>
                <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                  <i class="fa-solid fa-triangle-exclamation mr-1"></i> IAN Distance: ${tr.criticalNerveDistance} mm
                </span>
              </div>

              <div class="h-32 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 relative overflow-hidden">
                <div class="w-24 h-24 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center animate-pulse">
                  <span class="text-xs font-bold text-rose-300">Resection Zone</span>
                </div>
              </div>

              <p class="text-[11px] text-slate-400">A 1.0cm margin provides 100% histological tumor clearance while retaining adequate proximal ramus height.</p>
            </div>
          </div>

        </div>
      </div>
    `;

    document.getElementById('surgicalMarginRange')?.addEventListener('input', (e) => {
      const marginVal = parseFloat(e.target.value);
      document.getElementById('marginValDisplay').innerText = marginVal + ' cm';
      const calc = ReconServices.calculateTissueRemoval(tr.tumorVolume, marginVal);
      document.getElementById('totalRemovalDisplay').innerText = calc.totalRemovalVolCm3 + ' cm³';
    });
  }

  // -------------------------------------------------------------
  // 9. SURGICAL MARGIN ANALYSIS MODULE
  // -------------------------------------------------------------
  function renderMarginAnalysis(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Surgical Margin Clearance Evaluator</h2>
          <p class="text-xs text-slate-500">Color-coded safety classification (Green Safe, Yellow Warning, Red Dangerous) for oncological boundary preservation.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div class="medical-card p-5 border-l-4 border-emerald-500">
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">Optimal Safe</span>
            <h3 class="font-bold text-base text-slate-900 mt-2">Recommended Margin</h3>
            <p class="text-3xl font-extrabold text-emerald-600 font-display mt-1">1.0 - 1.5 cm</p>
            <p class="text-xs text-slate-500 mt-2">Zero recurrence probability in 5-year follow-up cohort.</p>
          </div>

          <div class="medical-card p-5 border-l-4 border-amber-500">
            <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">Caution Warning</span>
            <h3 class="font-bold text-base text-slate-900 mt-2">Minimum Margin</h3>
            <p class="text-3xl font-extrabold text-amber-600 font-display mt-1">0.5 cm</p>
            <p class="text-xs text-slate-500 mt-2">Nerve preservation prioritized; requires intra-operative frozen section.</p>
          </div>

          <div class="medical-card p-5 border-l-4 border-rose-500">
            <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">High Risk</span>
            <h3 class="font-bold text-base text-slate-900 mt-2">Inadequate Margin</h3>
            <p class="text-3xl font-extrabold text-rose-600 font-display mt-1">&lt; 0.5 cm</p>
            <p class="text-xs text-slate-500 mt-2">High risk of microscopic tumor cell spillage & pathological relapse.</p>
          </div>

        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 10. FREE FLAP RECOMMENDATION MODULE
  // -------------------------------------------------------------
  function renderFlapRecommendation(container, patient) {
    const flaps = ReconServices.calculateFlapRecommendation(patient.boneMetrics.length, patient.boneMetrics.defectVolume, patient.softTissueMetrics.softTissueLoss);
    
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">AI Free Flap Recommendation Engine</h2>
          <p class="text-xs text-slate-500">Evaluates autologous donor options (Fibula, DCIA, RFFF, ALT, Scapular) matched against required bone length and vascular pedicle length.</p>
        </div>

        <div class="space-y-4">
          ${flaps.map((f, idx) => `
            <div class="medical-card p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${f.recommended ? 'border-2 border-emerald-500 shadow-lg' : ''}">
              <div class="space-y-1">
                <div class="flex items-center space-x-3">
                  <span class="w-7 h-7 rounded-full ${f.recommended ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'} flex items-center justify-center font-bold text-xs">${idx + 1}</span>
                  <h3 class="font-bold text-base text-slate-900">${f.name}</h3>
                  ${f.recommended ? '<span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Top AI Recommendation</span>' : ''}
                </div>
                <p class="text-xs text-slate-500">${f.type} • Pedicle Length: <span class="font-semibold text-slate-700">${f.pedicleLength}</span></p>
                <p class="text-xs text-slate-600 pt-1"><i class="fa-solid fa-circle-info text-blue-500 mr-1"></i> ${f.matchReason}</p>
              </div>

              <div class="flex items-center space-x-6 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                <div class="text-center">
                  <span class="text-[10px] text-slate-400 block">Success Rate</span>
                  <span class="font-bold text-xs text-slate-800">${f.successRate}%</span>
                </div>

                <div class="text-right">
                  <span class="text-[10px] text-slate-400 block">Match Score</span>
                  <span class="text-2xl font-extrabold ${f.recommended ? 'text-emerald-600' : 'text-slate-700'} font-display">${f.score} / 100</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 11. FIXATION RECOMMENDATION MODULE
  // -------------------------------------------------------------
  function renderFixationRecommendation(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Osteosynthesis Fixation & Plate Recommendation</h2>
          <p class="text-xs text-slate-500">Biomechanical finite element analysis (FEA) for patient-specific titanium plate geometry, screw count, and stress distribution.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          ${ReconData.fixationPlates.map(p => `
            <div class="medical-card p-5 flex flex-col justify-between ${p.recommended ? 'border-2 border-blue-500 ring-2 ring-blue-500/20' : ''}">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2 py-0.5 rounded ${p.recommended ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'} text-[10px] font-bold uppercase">${p.type}</span>
                  <span class="font-bold text-xs text-emerald-600">${p.mechanicalStabilityScore}% Stability</span>
                </div>

                <h3 class="font-bold text-base text-slate-900">${p.name}</h3>
                
                <div class="my-4 space-y-2 text-xs">
                  <div class="flex justify-between py-1 border-b border-slate-100">
                    <span class="text-slate-500">Plate Thickness:</span>
                    <span class="font-bold text-slate-800">${p.thickness}</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-slate-100">
                    <span class="text-slate-500">Recommended Screws:</span>
                    <span class="font-bold text-slate-800">${p.recommendedScrews} (${p.screwDiameter})</span>
                  </div>
                  <div class="flex justify-between py-1 border-b border-slate-100">
                    <span class="text-slate-500">Screw Length:</span>
                    <span class="font-bold text-slate-800">${p.screwLength}</span>
                  </div>
                  <div class="flex justify-between py-1">
                    <span class="text-slate-500">Stress Distribution:</span>
                    <span class="font-bold text-blue-600">${p.stressDistribution}</span>
                  </div>
                </div>
              </div>

              <button onclick="alert('Selected ${p.name} for surgical plan')" class="w-full py-2 ${p.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} font-bold text-xs rounded-lg transition">
                ${p.recommended ? 'Selected Hardware Plan' : 'Select Alternative'}
              </button>
            </div>
          `).join('')}

        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 12. AI SURGICAL PLANNING MODULE
  // -------------------------------------------------------------
  function renderSurgicalPlanning(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">AI Surgical Sequence & Plan Blueprint</h2>
          <p class="text-xs text-slate-500">Step-by-step intra-operative workflow guidance, operating duration estimate, and blood loss predictions.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div class="lg:col-span-2 medical-card p-5 space-y-4">
            <h3 class="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Recommended Surgical Sequence</h3>

            <div class="space-y-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <span class="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">1</span>
                <div>
                  <h4 class="font-bold text-slate-800">Tracheostomy & Intraoral Access</h4>
                  <p class="text-slate-500">Establish airway and expose right mandibular angle via submandibular apron incision.</p>
                </div>
              </div>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <span class="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">2</span>
                <div>
                  <h4 class="font-bold text-slate-800">PSI Cutting Guide Fixation & Virtual Cut</h4>
                  <p class="text-slate-500">Attach 3D printed surgical cutting guide; perform osteotomies with 1.0cm margin clearance.</p>
                </div>
              </div>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start space-x-3">
                <span class="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-xs">3</span>
                <div>
                  <h4 class="font-bold text-slate-800">Fibula Free Flap Harvesting & Microvascular Anastomosis</h4>
                  <p class="text-slate-500">Harvest 7.6cm fibular graft with peroneal artery pedicle; anastomose to right facial artery.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="medical-card p-5 space-y-4 text-xs">
            <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-2">Intra-Operative Predictions</h3>

            <div class="p-3 bg-blue-50 rounded-lg">
              <span class="text-slate-500">Estimated Operation Time:</span>
              <p class="text-xl font-bold text-blue-700 font-display">4 Hours 15 Mins</p>
            </div>

            <div class="p-3 bg-rose-50 rounded-lg">
              <span class="text-slate-500">Estimated Blood Loss:</span>
              <p class="text-xl font-bold text-rose-700 font-display">250 - 350 mL</p>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 13. DIGITAL TWIN SURGICAL SIMULATOR MODULE
  // -------------------------------------------------------------
  function renderDigitalTwinSimulator(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold font-display text-slate-900">Digital Twin Virtual Surgical Simulator</h2>
            <p class="text-xs text-slate-500">Perform real-time virtual bone cutting, tissue resection, plate positioning, and instant volume recalculation.</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">Virtual Operating Room</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <!-- Virtual OR Toolkit -->
          <div class="lg:col-span-1 medical-card p-5 space-y-4 text-xs">
            <h3 class="font-bold text-slate-900 border-b border-slate-100 pb-2">Virtual Surgical Tools</h3>

            <button id="simCutBtn" class="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition shadow flex items-center justify-center space-x-2">
              <i class="fa-solid fa-scissors"></i>
              <span>Execute Virtual Bone Cut</span>
            </button>

            <button id="simResetBtn" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition">
              Reset Digital Twin Model
            </button>

            <div class="pt-4 border-t border-slate-100 space-y-2">
              <h4 class="font-bold text-slate-900">Real-Time Outcome Delta</h4>
              
              <div class="p-2.5 bg-slate-50 rounded">
                <span class="text-slate-500">Original Volume:</span>
                <span class="font-bold text-slate-800 float-right">38.4 cm³</span>
              </div>

              <div class="p-2.5 bg-slate-50 rounded">
                <span class="text-slate-500">Post-Cut Volume:</span>
                <span class="font-bold text-emerald-600 float-right" id="postCutVolText">38.4 cm³</span>
              </div>
            </div>
          </div>

          <!-- 3D Simulator Viewport -->
          <div class="lg:col-span-3 medical-card p-2 flex flex-col">
            <div id="simViewport" class="viewport-canvas w-full h-[500px] rounded-xl overflow-hidden"></div>
          </div>

        </div>
      </div>
    `;

    setTimeout(() => {
      threeEngine = new Recon3DEngine('simViewport');

      document.getElementById('simCutBtn')?.addEventListener('click', () => {
        if (threeEngine) threeEngine.executeVirtualCut();
        document.getElementById('postCutVolText').innerText = '19.8 cm³ (Graft Filled)';
        alert('Virtual Osteotomy Complete: Fibula Free Flap & Titanium PSI Plate inserted!');
      });

      document.getElementById('simResetBtn')?.addEventListener('click', () => {
        if (threeEngine) threeEngine.resetVirtualCut();
        document.getElementById('postCutVolText').innerText = '38.4 cm³';
      });
    }, 50);
  }

  // -------------------------------------------------------------
  // 14. COMPARATIVE ANALYSIS MODULE
  // -------------------------------------------------------------
  function renderComparativeAnalysis(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Comparative Method Analysis & Benchmarking</h2>
          <p class="text-xs text-slate-500">Evaluates Manual vs. CT-Based vs. MRI-Based vs. AI-Based Assessment across Dice score, accuracy, sensitivity, and processing speed.</p>
        </div>

        <div class="medical-card p-5 overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th class="p-3">Methodology</th>
                <th class="p-3">Dice Score</th>
                <th class="p-3">Accuracy</th>
                <th class="p-3">Sensitivity</th>
                <th class="p-3">Specificity</th>
                <th class="p-3">Processing Time</th>
                <th class="p-3">Bone Vol Delta</th>
              </tr>
            </thead>
            <tbody>
              ${ReconData.comparativeMethods.map(m => `
                <tr class="border-b border-slate-100 ${m.method.includes('AI') ? 'bg-blue-50/60 font-semibold' : ''}">
                  <td class="p-3 text-slate-900">${m.method}</td>
                  <td class="p-3 font-mono ${m.method.includes('AI') ? 'text-blue-700 font-bold' : ''}">${m.diceScore}</td>
                  <td class="p-3 font-mono">${m.accuracy}</td>
                  <td class="p-3 font-mono">${m.sensitivity}</td>
                  <td class="p-3 font-mono">${m.specificity}</td>
                  <td class="p-3 text-slate-600">${m.processingTime}</td>
                  <td class="p-3 text-slate-600">${m.boneVolumeDiff}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="medical-card p-5">
          <h3 class="font-bold text-sm text-slate-900 mb-4">Accuracy & Processing Speed Comparison</h3>
          <div class="h-64">
            <canvas id="comparativeChart"></canvas>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const ctxComp = document.getElementById('comparativeChart');
      if (ctxComp) {
        activeCharts.comparative = new Chart(ctxComp, {
          type: 'bar',
          data: {
            labels: ['AI-Based (ReconAI)', 'CT-Based Auto', 'MRI Soft Tissue', 'Manual Caliper'],
            datasets: [
              { label: 'Dice Score (x100)', data: [94.2, 88.5, 89.1, 74.5], backgroundColor: '#2563eb' },
              { label: 'Accuracy %', data: [98.4, 92.1, 91.8, 79.5], backgroundColor: '#10b981' }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }
    }, 50);
  }

  // -------------------------------------------------------------
  // 15. RISK PREDICTION MODULE
  // -------------------------------------------------------------
  function renderRiskPrediction(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">AI Risk Prediction & Preventive Guidelines</h2>
          <p class="text-xs text-slate-500">Probabilistic risk model predicting implant failure, plate fracture, bone resorption, and nerve injury.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${ReconData.riskPredictions.map(r => `
            <div class="medical-card p-5 space-y-3">
              <div class="flex justify-between items-center">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.level === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${r.level} Risk</span>
                <span class="text-xl font-extrabold font-display ${r.level === 'Low' ? 'text-emerald-600' : 'text-amber-600'}">${r.percentage}%</span>
              </div>
              <h3 class="font-bold text-sm text-slate-900">${r.risk}</h3>
              <p class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100"><i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i> ${r.advice}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 16. POST-OPERATIVE ANALYSIS MODULE
  // -------------------------------------------------------------
  function renderPostOpAnalysis(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Post-Operative CT Alignment & Healing Analysis</h2>
          <p class="text-xs text-slate-500">Superimposes pre-operative 3D virtual plan against actual post-operative CT scan.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="medical-card p-5">
            <span class="text-xs text-slate-500 font-semibold">Anatomical Alignment Score</span>
            <p class="text-3xl font-extrabold text-emerald-600 font-display mt-1">98.2%</p>
            <p class="text-xs text-slate-500 mt-2">Deviation &lt; 0.8mm across all 3 spatial planes.</p>
          </div>

          <div class="medical-card p-5">
            <span class="text-xs text-slate-500 font-semibold">Primary Union Progress</span>
            <p class="text-3xl font-extrabold text-blue-600 font-display mt-1">Grade A</p>
            <p class="text-xs text-slate-500 mt-2">Bicortical contact verified at both distal/proximal cuts.</p>
          </div>

          <div class="medical-card p-5">
            <span class="text-xs text-slate-500 font-semibold">Recovery Trajectory</span>
            <p class="text-3xl font-extrabold text-purple-600 font-display mt-1">On Schedule</p>
            <p class="text-xs text-slate-500 mt-2">Ready for dental implant placement at 4 months.</p>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 17. SURGICAL REPORT GENERATION MODULE
  // -------------------------------------------------------------
  function renderReports(container, patient) {
    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-bold font-display text-slate-900">Hospital Surgical Planning Report Generator</h2>
            <p class="text-xs text-slate-500">Generate commercial-grade downloadable PDF surgical planning reports with official hospital seals.</p>
          </div>
          <button onclick="window.print()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow flex items-center space-x-2">
            <i class="fa-solid fa-print"></i>
            <span>Print / Export Surgical PDF</span>
          </button>
        </div>

        <!-- Printable Report Container -->
        <div id="printableReport" class="medical-card p-8 bg-white max-w-4xl mx-auto space-y-6 border border-slate-300">
          
          <!-- Hospital Header -->
          <div class="flex justify-between items-center border-b-2 border-slate-900 pb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                <i class="fa-solid fa-hospital"></i>
              </div>
              <div>
                <h1 class="text-lg font-bold font-display text-slate-900">ST. JUDE ORAL & MAXILLOFACIAL SURGICAL CENTER</h1>
                <p class="text-[10px] text-slate-500">ReconAI Automated Surgical Intelligence Report • Confidential Medical Record</p>
              </div>
            </div>
            <div class="text-right text-xs">
              <p class="font-bold text-slate-800">Date: ${new Date().toLocaleDateString()}</p>
              <p class="text-slate-500">Report ID: RCN-2026-88392</p>
            </div>
          </div>

          <!-- Patient Meta Table -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl text-xs">
            <div>
              <span class="text-slate-500">Patient Name:</span>
              <p class="font-bold text-slate-900">${patient.name}</p>
            </div>
            <div>
              <span class="text-slate-500">Hospital ID:</span>
              <p class="font-bold text-slate-900">${patient.hospitalNo}</p>
            </div>
            <div>
              <span class="text-slate-500">Age / Gender:</span>
              <p class="font-bold text-slate-900">${patient.age} Y / ${patient.gender}</p>
            </div>
            <div>
              <span class="text-slate-500">Diagnosis:</span>
              <p class="font-bold text-slate-900">${patient.disease}</p>
            </div>
          </div>

          <!-- Volumetric Summary -->
          <div class="space-y-2 text-xs">
            <h3 class="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1">1. AI Volumetric & Removal Summary</h3>
            <div class="grid grid-cols-3 gap-4 p-3 bg-blue-50/50 rounded-lg">
              <div><span class="text-slate-500">Defect Length:</span> <span class="font-bold">${patient.boneMetrics.length} mm</span></div>
              <div><span class="text-slate-500">Bone Defect Vol:</span> <span class="font-bold">${patient.boneMetrics.defectVolume} cm³</span></div>
              <div><span class="text-slate-500">Tissue Removal Vol:</span> <span class="font-bold text-rose-600">${patient.tissueRemoval.totalRemovalVolume} cm³</span></div>
            </div>
          </div>

          <!-- Recommended Flap & Hardware -->
          <div class="space-y-2 text-xs">
            <h3 class="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1">2. Reconstruction Plan Recommendations</h3>
            <p><span class="font-bold">Autologous Donor Flap:</span> Fibula Free Flap (Vascularized Osseous Graft, Score: 96/100)</p>
            <p><span class="font-bold">Osteosynthesis Hardware:</span> Patient-Specific Titanium 3D Mesh / Plate (2.4mm) with 8 Screws</p>
          </div>

          <!-- Signature & Seal -->
          <div class="pt-8 flex justify-between items-end border-t border-slate-200 text-xs">
            <div>
              <div class="w-32 border-b border-slate-400 mb-1"></div>
              <p class="font-bold text-slate-900">${ReconData.currentUserName}</p>
              <p class="text-[10px] text-slate-500">Lead Oral & Maxillofacial Surgeon</p>
            </div>

            <div class="w-20 h-20 rounded-full border-2 border-blue-600/40 flex items-center justify-center text-blue-700/60 font-bold text-[9px] uppercase text-center transform -rotate-12">
              St. Jude<br>Hospital<br>Seal
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 18. ANALYTICS MODULE
  // -------------------------------------------------------------
  function renderAnalytics(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Hospital System Analytics</h2>
          <p class="text-xs text-slate-500">Monthly case trends, disease frequency distribution, and complication rate tracking.</p>
        </div>

        <div class="medical-card p-5">
          <h3 class="font-bold text-sm text-slate-900 mb-4">Surgical Complication Rate (%)</h3>
          <div class="h-64">
            <canvas id="complicationChart"></canvas>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const ctxComp = document.getElementById('complicationChart');
      if (ctxComp) {
        activeCharts.complications = new Chart(ctxComp, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{ label: 'Complication Rate %', data: [4.2, 3.8, 3.1, 2.5, 2.1, 1.8, 1.5], borderColor: '#ef4444', fill: false }]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }
    }, 50);
  }

  // -------------------------------------------------------------
  // 19. DATABASE SCHEMA VIEWER MODULE
  // -------------------------------------------------------------
  function renderDatabaseSchema(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-bold font-display text-slate-900">Database Schema & AI API Architecture</h2>
          <p class="text-xs text-slate-500">14 Relational Database Tables and Modular Deep Learning Framework Connections.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${ReconData.databaseTables.map(t => `
            <div class="medical-card p-4 space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="font-bold text-blue-600 font-mono">${t.name}</span>
                <span class="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600">${t.count} records</span>
              </div>
              <p class="text-slate-600 text-[11px]">${t.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // HELPER LISTENERS & INITIALIZERS
  // -------------------------------------------------------------
  function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const mod = link.getAttribute('data-module');
        if (mod) loadModule(mod);
      });
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) loadModule(hash);
    });
  }

  function initPatientSelector() {
    const select = document.getElementById('activePatientSelect');
    if (!select) return;

    select.innerHTML = ReconData.patients.map(p => `
      <option value="${p.id}" ${p.id === ReconData.activePatientId ? 'selected' : ''}>
        ${p.name} (${p.id})
      </option>
    `).join('');

    select.addEventListener('change', (e) => {
      ReconApp.selectActivePatient(e.target.value);
    });

    updateQuickPatientMeta();
  }

  function updateQuickPatientMeta() {
    const patient = ReconServices.getActivePatient();
    document.getElementById('quickDefectBadge').innerText = patient.diagnosis.split(' ')[0];
    document.getElementById('quickAgeGender').innerText = `${patient.age} Y / ${patient.gender}`;
    document.getElementById('quickHospId').innerText = patient.hospitalNo;
  }

  function initRoleSwitcher() {
    document.getElementById('switchRoleBtn')?.addEventListener('click', () => {
      document.getElementById('loginModal')?.classList.remove('hidden');
    });

    document.getElementById('openLoginModalBtn')?.addEventListener('click', () => {
      document.getElementById('loginModal')?.classList.remove('hidden');
    });

    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('roleSelect').value;
      const user = ReconData.roles.find(r => r.id === role);
      if (user) {
        ReconData.currentUserRole = user.id;
        ReconData.currentUserName = user.name;
        document.getElementById('currentRoleDisplay').innerText = user.id;
        document.getElementById('userNameDisplay').innerText = user.name;
        document.getElementById('userRoleSub').innerText = user.title;
        document.getElementById('userAvatar').src = user.avatar;
      }
      document.getElementById('loginModal')?.classList.add('hidden');
      document.getElementById('otpModal')?.classList.remove('hidden');
    });

    document.getElementById('verifyOtpBtn')?.addEventListener('click', () => {
      document.getElementById('otpModal')?.classList.add('hidden');
      alert(`Authenticated successfully as ${ReconData.currentUserName} (${ReconData.currentUserRole})`);
    });
  }

  function initModals() {
    document.getElementById('closeLoginModal')?.addEventListener('click', () => {
      document.getElementById('loginModal')?.classList.add('hidden');
    });

    document.getElementById('viewAuditLogsBtn')?.addEventListener('click', () => {
      const tbody = document.getElementById('auditLogsTableBody');
      if (tbody) {
        tbody.innerHTML = ReconData.auditLogs.map(l => `
          <tr class="border-b border-slate-100 hover:bg-slate-50">
            <td class="p-2 font-mono text-slate-500">${l.timestamp}</td>
            <td class="p-2 font-semibold text-slate-800">${l.user}</td>
            <td class="p-2 text-slate-700">${l.action}</td>
            <td class="p-2 font-mono text-blue-600">${l.target}</td>
            <td class="p-2 font-mono text-slate-400">${l.ip}</td>
          </tr>
        `).join('');
      }
      document.getElementById('auditLogsModal')?.classList.remove('hidden');
    });

    document.getElementById('closeAuditLogsModal')?.addEventListener('click', () => {
      document.getElementById('auditLogsModal')?.classList.add('hidden');
    });
  }

  function initAIChat() {
    const drawer = document.getElementById('aiChatDrawer');
    document.getElementById('openAIChatBtn')?.addEventListener('click', () => {
      drawer?.classList.remove('translate-x-full');
    });
    document.getElementById('closeAIChatDrawer')?.addEventListener('click', () => {
      drawer?.classList.add('translate-x-full');
    });

    document.querySelectorAll('.suggested-prompt').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById('aiChatInput');
        if (input) {
          input.value = btn.innerText;
          sendChatMessage(btn.innerText);
        }
      });
    });

    document.getElementById('aiChatForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('aiChatInput');
      if (input && input.value.trim()) {
        sendChatMessage(input.value.trim());
        input.value = '';
      }
    });
  }

  function sendChatMessage(msgText) {
    const history = document.getElementById('chatMessageHistory');
    if (!history) return;

    // Append User Message
    const userMsgHTML = `
      <div class="flex items-start justify-end space-x-2">
        <div class="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-white max-w-[80%]">
          <p>${msgText}</p>
        </div>
      </div>
    `;
    history.insertAdjacentHTML('beforeend', userMsgHTML);

    // AI Response
    const response = ReconServices.simulateAIService.askAssistant(msgText);
    setTimeout(() => {
      const aiMsgHTML = `
        <div class="flex items-start space-x-2">
          <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div class="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 text-slate-200">
            <p>${response}</p>
          </div>
        </div>
      `;
      history.insertAdjacentHTML('beforeend', aiMsgHTML);
      history.scrollTop = history.scrollHeight;
    }, 400);
  }

  // Global App Namespace API
  window.ReconApp = {
    selectActivePatient: function(id) {
      ReconData.activePatientId = id;
      updateQuickPatientMeta();
      loadModule(currentModule);
    }
  };

});
