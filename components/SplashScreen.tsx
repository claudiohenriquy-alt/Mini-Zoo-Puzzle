
import React from 'react';
import { PawPrint } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-brand-yellow to-brand-orange animate-fade-in">
      <div className="flex items-center space-x-4">
        <PawPrint className="text-white w-16 h-16 md:w-24 md:h-24 animate-bounce-slow" />
        <h1 className="text-5xl md:text-8xl font-display text-white drop-shadow-lg">
          Mini Zoo Puzzles
        </h1>
      </div>
      <p className="mt-4 text-white text-lg md:text-2xl font-sans">Loading... a world of fun!</p>
    </div>
  );
};

export default SplashScreen;
