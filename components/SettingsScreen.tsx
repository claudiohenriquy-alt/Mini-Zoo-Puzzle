
import React, { useState } from 'react';
import { ArrowLeft, Music, Volume2, Shield } from 'lucide-react';
import { Settings } from '../types';
import ZooButton from './ZooButton';
import ParentalGate from './ParentalGate';

interface SettingsScreenProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onBack: () => void;
}

const SettingsToggle: React.FC<{ label: string; icon: React.ReactNode; isOn: boolean; onToggle: () => void; }> = ({ label, icon, isOn, onToggle }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-2xl font-bold">{label}</span>
      </div>
      <button onClick={onToggle} className={`relative w-20 h-10 rounded-full transition-colors ${isOn ? 'bg-brand-green' : 'bg-gray-400'}`}>
        <span className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transform transition-transform ${isOn ? 'translate-x-10' : ''}`} />
      </button>
    </div>
  );
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, onSettingsChange, onBack }) => {
  const [showParentalGate, setShowParentalGate] = useState(false);

  const toggleMusic = () => {
    onSettingsChange({ ...settings, music: !settings.music });
  };

  const toggleEffects = () => {
    onSettingsChange({ ...settings, effects: !settings.effects });
  };
  
  const handleParentalGateSuccess = () => {
    setShowParentalGate(false);
    // Placeholder for "Remove Ads" logic
    alert("Parental gate passed! Ads would be removed here.");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-brand-purple to-brand-bg">
       {showParentalGate && <ParentalGate onSuccess={handleParentalGateSuccess} onCancel={() => setShowParentalGate(false)} />}
      <div className="bg-white/90 p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in">
        <h1 className="text-4xl font-display text-center mb-8">Settings</h1>
        <div className="space-y-6">
          <SettingsToggle label="Music" icon={<Music size={32} />} isOn={settings.music} onToggle={toggleMusic} />
          <SettingsToggle label="Effects" icon={<Volume2 size={32} />} isOn={settings.effects} onToggle={toggleEffects} />
        </div>
        <div className="mt-12 text-center">
            <ZooButton color="bg-brand-orange" onClick={() => setShowParentalGate(true)}>
                <Shield className="mr-2" />
                Remove Ads
            </ZooButton>
        </div>
      </div>
       <button onClick={onBack} className="absolute top-6 left-6 text-black bg-white/50 rounded-full p-3 hover:bg-white/80 transition-colors">
        <ArrowLeft size={32} />
      </button>
    </div>
  );
};

export default SettingsScreen;
