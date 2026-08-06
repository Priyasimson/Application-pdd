/**
 * ReconAI 2D DICOM Slice Viewer & Manual AI Segmentation Editor Canvas
 */

class ReconDICOMViewer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.currentSlice = 128;
    this.totalSlices = 256;
    
    // Image Controls
    this.windowLevel = 40; // HU
    this.windowWidth = 400; // HU
    this.contrast = 100; // %
    this.brightness = 100; // %
    this.noiseReduction = true;
    this.autoEnhance = true;

    // Segmentation Brush Editing Mode
    this.activeTool = 'pan'; // 'pan' | 'brush' | 'erase'
    this.brushSize = 12;
    this.isDrawing = false;
    this.segmentationMasks = []; // User-drawn manual edits

    this.initCanvas();
    this.setupEvents();
  }

  initCanvas() {
    this.canvas.width = 512;
    this.canvas.height = 512;
    this.renderSlice();
  }

  setupEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.activeTool === 'brush' || this.activeTool === 'erase') {
        this.isDrawing = true;
        this.addBrushStroke(e);
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isDrawing) {
        this.addBrushStroke(e);
      }
    });

    this.canvas.addEventListener('mouseup', () => {
      this.isDrawing = false;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.isDrawing = false;
    });
  }

  addBrushStroke(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * this.canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * this.canvas.height;

    this.segmentationMasks.push({
      x,
      y,
      size: this.brushSize,
      tool: this.activeTool,
      slice: this.currentSlice
    });

    this.renderSlice();
  }

  clearMasks() {
    this.segmentationMasks = [];
    this.renderSlice();
  }

  setSlice(sliceNum) {
    this.currentSlice = Math.max(1, Math.min(this.totalSlices, sliceNum));
    this.renderSlice();
  }

  renderSlice() {
    if (!this.ctx) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Draw Simulated DICOM Cross-Section Image (Mandible Slice)
    this.ctx.fillStyle = '#090D16';
    this.ctx.fillRect(0, 0, w, h);

    // Apply Contrast & Brightness Filters
    this.ctx.filter = `contrast(${this.contrast}%) brightness(${this.brightness}%) ${this.noiseReduction ? 'blur(0.5px)' : 'none'}`;

    // Soft Tissue Background Contour
    this.ctx.beginPath();
    this.ctx.arc(w / 2, h / 2, 180, 0, Math.PI * 2);
    this.ctx.fillStyle = '#1e293b';
    this.ctx.fill();

    // Mandible Bone Outline (Cortical Plate HU ~ 1000)
    this.ctx.lineWidth = 14;
    this.ctx.strokeStyle = '#e2e8f0';
    this.ctx.beginPath();
    this.ctx.arc(w / 2, h / 2 + 10, 120, 0.2 * Math.PI, 0.8 * Math.PI);
    this.ctx.stroke();

    // Mandibular Condyle & Teeth Slices
    for (let i = -4; i <= 4; i++) {
      this.ctx.fillStyle = '#f8fafc';
      this.ctx.fillRect(w / 2 + i * 22 - 6, h / 2 + 115, 12, 18);
    }

    // Tumor Lesion Voxel (Pathological Resection Area)
    this.ctx.fillStyle = 'rgba(239, 68, 68, 0.55)';
    this.ctx.beginPath();
    this.ctx.arc(w / 2 + 75, h / 2 + 50, 36 + (this.currentSlice % 8), 0, Math.PI * 2);
    this.ctx.fill();

    // Inferior Alveolar Nerve Canal (Glowing Yellow Dot)
    this.ctx.fillStyle = '#facc15';
    this.ctx.beginPath();
    this.ctx.arc(w / 2 + 68, h / 2 + 15, 5, 0, Math.PI * 2);
    this.ctx.fill();

    // Reset Filter
    this.ctx.filter = 'none';

    // 2. Draw Automatic AI Overlay Mask Boundaries
    this.ctx.strokeStyle = '#10b981'; // Green AI Mandible Boundary
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([4, 4]);
    this.ctx.beginPath();
    this.ctx.arc(w / 2, h / 2 + 10, 128, 0.18 * Math.PI, 0.82 * Math.PI);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // 3. Draw Manual Brush Strokes
    const currentSliceStrokes = this.segmentationMasks.filter(m => m.slice === this.currentSlice);
    currentSliceStrokes.forEach(stroke => {
      this.ctx.beginPath();
      this.ctx.arc(stroke.x, stroke.y, stroke.size, 0, Math.PI * 2);
      if (stroke.tool === 'brush') {
        this.ctx.fillStyle = 'rgba(37, 99, 235, 0.7)'; // Blue Manual Brush
      } else {
        this.ctx.fillStyle = '#090D16'; // Erase
      }
      this.ctx.fill();
    });

    // 4. DICOM Metadata Overlay On Canvas
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.font = '11px Inter, sans-serif';
    this.ctx.fillText(`Slice: ${this.currentSlice} / ${this.totalSlices}`, 12, 24);
    this.ctx.fillText(`WL: ${this.windowLevel} HU | WW: ${this.windowWidth} HU`, 12, 42);
    this.ctx.fillText(`Thickness: 1.25 mm | KVP: 120`, 12, 60);
    this.ctx.fillText(`Res: 512 x 512 | FOV: 240 mm`, w - 160, 24);
    this.ctx.fillText(`AI Seg Confidence: 98.4%`, w - 160, 42);
  }
}
