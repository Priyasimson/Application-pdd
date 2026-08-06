import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { ChatMessage } from '../../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { activePatient } = usePatient();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello Dr. Jenkins! I am your ReconAI Surgical AI Assistant. I have loaded active clinical metrics for ${activePatient.name} (${activePatient.id}). Ask me regarding tumor margins, free flap pedicles, or osteosynthesis stress analysis.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent surgical AI response
    setTimeout(() => {
      let responseText = '';
      const q = text.toLowerCase();

      if (q.includes('tissue') || q.includes('volume') || q.includes('remove')) {
        responseText = `For ${activePatient.name}, the AI calculated tumor volume is ${activePatient.tissueRemoval.tumorVolume} cm³. With a ${activePatient.tissueRemoval.surgicalMargin} cm margin, total removal is ${activePatient.tissueRemoval.totalRemovalVolume} cm³. Distance to Inferior Alveolar Nerve is ${activePatient.tissueRemoval.criticalNerveDistance} mm (${activePatient.tissueRemoval.marginSafety} zone).`;
      } else if (q.includes('flap') || q.includes('recommend')) {
        responseText = `Fibula Free Flap (FFF) is ranked #1 with a 96% suitability score for a ${activePatient.boneMetrics.length} mm segmental defect. It provides up to 25-30 cm of bicortical bone strength suitable for primary dental implants.`;
      } else if (q.includes('plate') || q.includes('fixation') || q.includes('screw')) {
        responseText = `Recommended Fixation: 2.0mm Titanium Reconstruction Plate with 6 bicortical locking screws. FEA stress simulation predicts max von Mises stress of 142.5 MPa under 350N masticatory force (Safety Factor: 2.4).`;
      } else {
        responseText = `ReconAI Assistant: Anatomical analysis for patient ${activePatient.id} indicates high primary bone union probability (96.2%). nnUNet segmentation confidence is 98.4%.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-slate-900 text-white z-50 shadow-2xl flex flex-col border-l border-slate-800 animate-slideLeft">
      {/* Drawer Header */}
      <div className="h-16 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm shadow-md shadow-blue-500/30">
            🤖
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Surgical AI Assistant</h4>
            <p className="text-[10px] text-emerald-400">Online • Active Case: {activePatient.id}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
          ✕
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start space-x-2 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                m.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
              }`}
            >
              {m.sender === 'user' ? '👨‍⚕️' : '🤖'}
            </div>
            <div
              className={`p-3 rounded-2xl max-w-[80%] ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
              }`}
            >
              <p>{m.text}</p>
              <span className="text-[9px] opacity-70 block text-right mt-1 font-mono">{m.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt Suggestions */}
      <div className="p-2 bg-slate-950/80 border-t border-slate-800 space-y-1">
        <p className="text-[10px] font-semibold text-slate-400 px-2">Clinical Query Pills:</p>
        <div className="flex flex-wrap gap-1 text-[10px]">
          <button onClick={() => handleSend('How much tissue to remove?')} className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition">
            Tissue volume removal?
          </button>
          <button onClick={() => handleSend('Recommend donor flap')} className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition">
            Best free flap?
          </button>
          <button onClick={() => handleSend('Fixation plate specs')} className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition">
            Fixation plate specs?
          </button>
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Ask surgical query..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-900 text-xs px-3 py-2 rounded-lg border border-slate-700 text-white focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold text-xs transition">
          Send
        </button>
      </form>
    </div>
  );
};
