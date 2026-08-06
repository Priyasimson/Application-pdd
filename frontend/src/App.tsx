import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientProvider, usePatient } from './context/PatientContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { CommandPalette } from './components/common/CommandPalette';
import { AIAssistantDrawer } from './components/common/AIAssistantDrawer';
import { AuditLogsModal } from './components/common/AuditLogsModal';
import { OTPModal } from './components/common/OTPModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { LoginPage } from './components/auth/LoginPage';

// Module Component Imports
import { Dashboard } from './components/dashboard/Dashboard';
import { PatientManagement } from './components/patients/PatientManagement';
import { MedicalImageUpload } from './components/imaging/MedicalImageUpload';
import { AISegmentation } from './components/segmentation/AISegmentation';
import { Reconstruction3DViewer } from './components/viewer3d/Reconstruction3DViewer';
import { BoneAnalysis } from './components/analysis/BoneAnalysis';
import { SoftTissueAnalysis } from './components/analysis/SoftTissueAnalysis';
import { TissueRemovalEstimator } from './components/analysis/TissueRemovalEstimator';
import { FlapRecommendation } from './components/planning/FlapRecommendation';
import { FixationRecommendation } from './components/planning/FixationRecommendation';
import { SurgicalPlanning } from './components/planning/SurgicalPlanning';
import { DigitalTwinSimulator } from './components/digitaltwin/DigitalTwinSimulator';
import { ComparativeAnalysis } from './components/comparative/ComparativeAnalysis';
import { RiskPrediction } from './components/risk/RiskPrediction';
import { PostOpAnalysis } from './components/postop/PostOpAnalysis';
import { SurgicalReports } from './components/reports/SurgicalReports';
import { HospitalAnalytics } from './components/analytics/HospitalAnalytics';
import { SystemSettings } from './components/settings/SystemSettings';
import { AdminPanel } from './components/admin/AdminPanel';
import { InventoryLibrary } from './components/extra/InventoryLibrary';

// Toast Container Component
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAuth();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start space-x-3 text-xs animate-scaleUp ${
            t.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
              : t.type === 'error'
              ? 'bg-rose-900 text-rose-100 border-rose-700'
              : t.type === 'warning'
              ? 'bg-amber-900 text-amber-100 border-amber-700'
              : 'bg-blue-900 text-blue-100 border-blue-700'
          }`}
        >
          <span className="text-base font-bold">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '🚨' : t.type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <div className="flex-1">
            <h4 className="font-bold">{t.title}</h4>
            <p className="text-[11px] opacity-90 mt-0.5">{t.message}</p>
          </div>
          <button onClick={() => removeToast(t.id)} className="opacity-70 hover:opacity-100 font-bold">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { activeModule } = usePatient();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientManagement />;
      case 'imaging':
        return <MedicalImageUpload />;
      case 'segmentation':
        return <AISegmentation />;
      case 'reconstruction3d':
        return <Reconstruction3DViewer />;
      case 'bone-analysis':
        return <BoneAnalysis />;
      case 'soft-tissue':
        return <SoftTissueAnalysis />;
      case 'tissue-removal':
      case 'margin-analysis':
        return <TissueRemovalEstimator />;
      case 'flap-recommendation':
        return <FlapRecommendation />;
      case 'fixation':
        return <FixationRecommendation />;
      case 'surgical-planning':
        return <SurgicalPlanning />;
      case 'digital-twin':
        return <DigitalTwinSimulator />;
      case 'comparative':
        return <ComparativeAnalysis />;
      case 'risk-prediction':
        return <RiskPrediction />;
      case 'postop':
        return <PostOpAnalysis />;
      case 'reports':
        return <SurgicalReports />;
      case 'inventory':
        return <InventoryLibrary />;
      case 'analytics':
        return <HospitalAnalytics />;
      case 'settings':
        return <SystemSettings />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans antialiased relative">
      {/* Toast Alerts Overlay */}
      <ToastContainer />

      {/* Sidebar Navigation */}
      <Sidebar onOpenLoginModal={() => setShowLoginModal(true)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onOpenAIChat={() => setShowAIChat(true)}
          onOpenCommandPalette={() => setShowCommandPalette(true)}
          onOpenShortcuts={() => setShowShortcuts(true)}
        />

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {renderModule()}
        </main>
      </div>

      {/* Overlays, Drawers & Modals */}
      <AIAssistantDrawer isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
      <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <LoginPage isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <AuditLogsModal />
      <OTPModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <AppContent />
      </PatientProvider>
    </AuthProvider>
  );
}
