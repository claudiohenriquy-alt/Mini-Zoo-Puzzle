import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Theme } from '../types';
import { useAudio } from '../hooks/useAudio';

interface ThemeSelectScreenProps {
  themes: Theme[];
  onSelectTheme: (theme: Theme) => void;
  onBack: () => void;
}

const ThemeSelectScreen: React.FC<ThemeSelectScreenProps> = ({ themes, onSelectTheme, onBack }) => {
    const { playClick } = useAudio();

    const handleThemeClick = (theme: Theme) => {
        playClick();
        onSelectTheme(theme);
    };
    
    return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-brand-blue to-brand-green">
      <h1 className="text-5xl md:text-7xl font-display text-white mb-10 drop-shadow-lg animate-fade-in">Choose a Theme</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{animationDelay: '200ms'}}>
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeClick(theme)}
              className={`w-64 h-64 md:w-80 md:h-80 rounded-3xl flex flex-col justify-center items-center shadow-xl transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 ring-white/50 ${theme.color}`}
            >
              <Icon className="w-24 h-24 md:w-32 md:h-32 text-white" />
              <span className="mt-4 font-display text-3xl md:text-4xl text-white">{theme.name}</span>
            </button>
          );
        })}
      </div>
       <button onClick={onBack} className="absolute top-6 left-6 text-white bg-black/20 rounded-full p-3 hover:bg-black/40 transition-colors">
        <ArrowLeft size={32} />
      </button>
    </div>
  );
};

export default ThemeSelectScreen;