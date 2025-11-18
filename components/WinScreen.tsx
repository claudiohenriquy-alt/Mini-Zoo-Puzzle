import React, { useEffect } from 'react';
import { Star, Home } from 'lucide-react';
import ZooButton from './ZooButton';
import { useAudio } from '../hooks/useAudio';

interface WinScreenProps {
  animalName: string;
  onNextLevel?: () => void;
  onGoToCollection: () => void;
  onGoHome: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ animalName, onNextLevel, onGoToCollection, onGoHome }) => {
  const { playWin } = useAudio();

  useEffect(() => {
    playWin();
  }, [playWin]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-brand-green to-brand-yellow">
      <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl text-center animate-tada relative overflow-hidden">
        {/* Simple CSS confetti decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
           <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full animate-bounce-slow" style={{animationDelay: '0s'}}></div>
           <div className="absolute top-10 right-10 w-4 h-4 bg-blue-500 rounded-full animate-bounce-slow" style={{animationDelay: '0.5s'}}></div>
           <div className="absolute bottom-10 left-20 w-4 h-4 bg-yellow-500 rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
           <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-purple-500 rounded-full animate-bounce-slow" style={{animationDelay: '1.5s'}}></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-display text-brand-orange drop-shadow-md relative z-10">You did it!</h1>
        <p className="text-xl md:text-2xl mt-4 relative z-10">You've unlocked the</p>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 relative z-10">{animalName}!</h2>
        <div className="my-6 md:my-8 p-4 bg-white rounded-2xl shadow-inner relative z-10">
           <img src={`https://picsum.photos/seed/${animalName}/256/256`} alt={animalName} className="w-48 h-48 md:w-64 md:h-64 rounded-xl object-cover inline-block" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            {onNextLevel && <ZooButton onClick={onNextLevel} color="bg-brand-green">Next Level</ZooButton>}
            <ZooButton onClick={onGoToCollection} color="bg-brand-yellow" className="flex items-center justify-center">
                <Star className="mr-2"/> Collection
            </ZooButton>
            <ZooButton onClick={onGoHome} color="bg-brand-blue" className="flex items-center justify-center">
                <Home className="mr-2"/> Home
            </ZooButton>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;