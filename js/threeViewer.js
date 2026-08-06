/**
 * ReconAI Three.js WebGL 3D Anatomical Reconstruction & Digital Twin Simulator
 */

class Recon3DEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    
    // Anatomical Meshes
    this.mandibleMesh = null;
    this.tumorMesh = null;
    this.softTissueMesh = null;
    this.nerveMesh = null;
    this.plateMesh = null;
    this.screwsGroup = null;
    this.cutGuideMesh = null;

    // View Options
    this.showBone = true;
    this.showTumor = true;
    this.showSoftTissue = true;
    this.showNerve = true;
    this.showPlate = true;

    // Mode: 'normal' | 'digitalTwinCut' | 'measurement'
    this.mode = 'normal';
    this.isCutExecuted = false;

    this.init();
  }

  init() {
    // Canvas dimensions
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 450;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0F172A);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 15, 60);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls
    if (THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
    }

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(20, 40, 30);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2563eb, 0.4);
    dirLight2.position.set(-20, -20, -20);
    this.scene.add(dirLight2);

    // 6. Build Anatomical Model
    this.buildAnatomy();

    // 7. Grid & Axis Helper
    const gridHelper = new THREE.GridHelper(80, 20, 0x334155, 0x1e293b);
    gridHelper.position.y = -20;
    this.scene.add(gridHelper);

    // 8. Animation Loop
    this.animate();

    // Resize Listener
    window.addEventListener('resize', () => this.onWindowResize());
  }

  buildAnatomy() {
    // Group for entire skull/mandible assembly
    this.anatomyGroup = new THREE.Group();

    // A. Mandible Bone Geometry (Horse-shoe curve approximation)
    const mandibleGeo = new THREE.TorusGeometry(18, 4.5, 16, 40, Math.PI * 0.85);
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 1.0
    });
    this.mandibleMesh = new THREE.Mesh(mandibleGeo, boneMaterial);
    this.mandibleMesh.rotation.x = Math.PI * 0.5;
    this.mandibleMesh.position.set(0, -2, 0);
    this.anatomyGroup.add(this.mandibleMesh);

    // Mandibular Condyles & Ramus Branches
    const ramusGeo = new THREE.CylinderGeometry(3.5, 4, 18, 16);
    const ramusRight = new THREE.Mesh(ramusGeo, boneMaterial);
    ramusRight.position.set(16, 8, -6);
    ramusRight.rotation.z = -0.2;
    this.anatomyGroup.add(ramusRight);

    const ramusLeft = new THREE.Mesh(ramusGeo, boneMaterial);
    ramusLeft.position.set(-16, 8, -6);
    ramusLeft.rotation.z = 0.2;
    this.anatomyGroup.add(ramusLeft);

    // B. Mandibular Ameloblastoma Tumor (Right Angle & Body)
    const tumorGeo = new THREE.SphereGeometry(6.5, 24, 24);
    const tumorMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Red Tumor
      roughness: 0.4,
      transparent: true,
      opacity: 0.85,
      emissive: 0x991b1b,
      emissiveIntensity: 0.3
    });
    this.tumorMesh = new THREE.Mesh(tumorGeo, tumorMaterial);
    this.tumorMesh.position.set(14, -1, 4);
    this.anatomyGroup.add(this.tumorMesh);

    // C. Inferior Alveolar Nerve (IAN - Glowing Yellow Canal)
    const nerveCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-15, 6, -5),
      new THREE.Vector3(-12, -2, 2),
      new THREE.Vector3(0, -4, 10),
      new THREE.Vector3(12, -2, 2),
      new THREE.Vector3(15, 6, -5)
    ]);
    const nerveGeo = new THREE.TubeGeometry(nerveCurve, 40, 1.2, 8, false);
    const nerveMaterial = new THREE.MeshStandardMaterial({
      color: 0xfacc15, // Glowing Yellow Nerve
      roughness: 0.2,
      emissive: 0xeab308,
      emissiveIntensity: 0.6
    });
    this.nerveMesh = new THREE.Mesh(nerveGeo, nerveMaterial);
    this.anatomyGroup.add(this.nerveMesh);

    // D. Soft Tissue Envelope (Transparent Cyan/Blue Sheath)
    const softTissueGeo = new THREE.TorusGeometry(21, 8.5, 16, 40, Math.PI * 0.9);
    const softTissueMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1
    });
    this.softTissueMesh = new THREE.Mesh(softTissueGeo, softTissueMat);
    this.softTissueMesh.rotation.x = Math.PI * 0.5;
    this.anatomyGroup.add(this.softTissueMesh);

    // E. Titanium Fixation Plate & Screws (Pre-curved PSI Plate)
    const plateCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(6, -2, 12),
      new THREE.Vector3(14, -2, 5),
      new THREE.Vector3(17, 4, -4)
    ]);
    const plateGeo = new THREE.TubeGeometry(plateCurve, 20, 1.8, 8, false);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2
    });
    this.plateMesh = new THREE.Mesh(plateGeo, plateMat);
    this.plateMesh.visible = false; // Hidden until planned
    this.anatomyGroup.add(this.plateMesh);

    // Screws Group
    this.screwsGroup = new THREE.Group();
    const screwGeo = new THREE.CylinderGeometry(0.8, 0.8, 6, 8);
    const screwMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9 });
    
    [new THREE.Vector3(7, -2, 12.5), new THREE.Vector3(10, -2, 10), new THREE.Vector3(15, -1, 3), new THREE.Vector3(17, 5, -3)].forEach(pos => {
      const screw = new THREE.Mesh(screwGeo, screwMat);
      screw.position.copy(pos);
      screw.rotation.z = Math.PI * 0.5;
      this.screwsGroup.add(screw);
    });
    this.screwsGroup.visible = false;
    this.anatomyGroup.add(this.screwsGroup);

    this.scene.add(this.anatomyGroup);
  }

  // Layer Visibility Controllers
  setBoneVisibility(visible) {
    if (this.mandibleMesh) this.mandibleMesh.visible = visible;
  }
  
  setTumorVisibility(visible) {
    if (this.tumorMesh) this.tumorMesh.visible = visible;
  }

  setSoftTissueVisibility(visible) {
    if (this.softTissueMesh) this.softTissueMesh.visible = visible;
  }

  setLayerOpacity(layer, opacityValue) {
    if (layer === 'bone' && this.mandibleMesh) {
      this.mandibleMesh.material.opacity = opacityValue;
    } else if (layer === 'softTissue' && this.softTissueMesh) {
      this.softTissueMesh.material.opacity = opacityValue;
    } else if (layer === 'tumor' && this.tumorMesh) {
      this.tumorMesh.material.opacity = opacityValue;
    }
  }

  // Virtual Surgical Bone Cut Simulator (Digital Twin)
  executeVirtualCut() {
    if (!this.tumorMesh || this.isCutExecuted) return;

    // Shrink tumor mesh and trigger cut plane visualization
    this.tumorMesh.scale.set(0.1, 0.1, 0.1);
    this.tumorMesh.visible = false;

    // Show Titanium Plate & Graft Replacement Mesh
    if (this.plateMesh) this.plateMesh.visible = true;
    if (this.screwsGroup) this.screwsGroup.visible = true;

    // Create Fibula Graft Replacement Mesh (Gold/Metallic Bone)
    const graftGeo = new THREE.CylinderGeometry(3.8, 3.8, 16, 16);
    const graftMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald Graft Reconstruction
      roughness: 0.3,
      metalness: 0.2
    });
    this.graftMesh = new THREE.Mesh(graftGeo, graftMat);
    this.graftMesh.position.set(14, -1, 3);
    this.graftMesh.rotation.z = 0.4;
    this.anatomyGroup.add(this.graftMesh);

    this.isCutExecuted = true;
  }

  resetVirtualCut() {
    if (this.tumorMesh) {
      this.tumorMesh.scale.set(1, 1, 1);
      this.tumorMesh.visible = true;
    }
    if (this.plateMesh) this.plateMesh.visible = false;
    if (this.screwsGroup) this.screwsGroup.visible = false;
    if (this.graftMesh) {
      this.anatomyGroup.remove(this.graftMesh);
      this.graftMesh = null;
    }
    this.isCutExecuted = false;
  }

  // Exploded View Mode Toggle
  toggleExplodedView(exploded) {
    if (!this.anatomyGroup) return;
    if (exploded) {
      if (this.mandibleMesh) this.mandibleMesh.position.set(-5, -2, -5);
      if (this.tumorMesh) this.tumorMesh.position.set(22, 6, 12);
      if (this.softTissueMesh) this.softTissueMesh.position.set(0, 15, 0);
      if (this.nerveMesh) this.nerveMesh.position.set(0, -12, 0);
    } else {
      if (this.mandibleMesh) this.mandibleMesh.position.set(0, -2, 0);
      if (this.tumorMesh) this.tumorMesh.position.set(14, -1, 4);
      if (this.softTissueMesh) this.softTissueMesh.position.set(0, 0, 0);
      if (this.nerveMesh) this.nerveMesh.position.set(0, 0, 0);
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
