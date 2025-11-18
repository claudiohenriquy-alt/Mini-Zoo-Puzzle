
import React from 'react';
import { ArrowLeft, Lock, CheckCircle, PawPrint } from 'lucide-react';
import { Level, Theme } from '../types';
import { useAudio } from '../hooks/useAudio';

interface LevelSelectScreenProps {
  theme: Theme;
  levels: Level[];
  unlockedLevels: string[];
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({ theme, levels, unlockedLevels, onSelectLevel, onBack }) => {
  const { playClick } = useAudio();

  const handleLevelClick = (level: Level) => {
    if (unlockedLevels.includes(level.id)) {
      playClick();
      onSelectLevel(level);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col items-center p-4 pt-20 ${theme.color} overflow-y-auto`}>
      <h1 className="text-5xl md:text-7xl font-display text-white mb-8 drop-shadow-lg">{theme.name} Puzzles</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {levels.map((level, index) => {
          const isUnlocked = unlockedLevels.includes(level.id);
          const isCompleted = unlockedLevels.includes(levels[index+1]?.id) || (index === levels.length -1 && unlockedLevels.includes(level.id))

          return (
            <button
              key={level.id}
              onClick={() => handleLevelClick(level)}
              disabled={!isUnlocked}
              className={`relative w-36 h-36 md:w-48 md:h-48 rounded-2xl shadow-lg flex flex-col justify-center items-center p-4 transform transition-transform 
              ${isUnlocked ? 'bg-white/80 backdrop-blur-sm hover:scale-105 active:scale-95 cursor-pointer' : 'bg-gray-400/50 cursor-not-allowed'}`}
            >
              {!isUnlocked && <Lock className="absolute top-2 right-2 text-white" />}
              {isCompleted && <CheckCircle className="absolute top-2 right-2 text-green-500" />}

              <img src={`https://picsum.photos/seed/${level.animalName}/100/100`} alt={level.animalName} className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-2" style={{ filter: isUnlocked ? 'none' : 'grayscale(100%)' }} />

              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <PawPrint key={i} size={16} className={i < level.pieces-2 ? 'text-yellow-500' : 'text-gray-300'} />
                ))}
              </div>
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

export default LevelSelectScreen;
