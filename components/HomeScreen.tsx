
import React from 'react';
import { Play, Star, Settings as SettingsIcon, PawPrint, Bird, Fish, Rabbit, Cat, Dog, Cloud, Sun, Snail, Turtle, Bug } from 'lucide-react';
import ZooButton from './ZooButton';
import { Screen } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100">
      
      {/* Cartoon Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sun */}
        <div className="absolute top-10 right-10 text-yellow-400 animate-spin-slow" style={{ animationDuration: '20s' }}>
          <Sun size={120} fill="currentColor" />
        </div>

        {/* Clouds */}
        <div className="absolute top-20 left-10 text-white/80 animate-bounce-slow" style={{ animationDuration: '6s' }}>
          <Cloud size={80} fill="currentColor" />
        </div>
        <div className="absolute top-40 right-1/3 text-white/60 animate-bounce-slow" style={{ animationDuration: '8s', animationDelay: '1s' }}>
          <Cloud size={60} fill="currentColor" />
        </div>
        <div className="absolute top-16 left-1/2 text-white/50 animate-bounce-slow" style={{ animationDuration: '9s', animationDelay: '2.5s' }}>
          <Cloud size={45} fill="currentColor" />
        </div>

        {/* Flying Birds */}
        <div className="absolute top-1/4 left-10 text-white/40 transform -rotate-12">
           <Bird size={64} />
        </div>
        <div className="absolute top-20 left-1/4 text-white/30 transform rotate-6">
           <Bird size={32} />
        </div>

        {/* Hills Background */}
        <div className="absolute -bottom-20 -left-20 w-[120%] h-80 bg-brand-green rounded-[100%] border-t-8 border-green-400 shadow-lg transform -rotate-2"></div>
        <div className="absolute -bottom-32 -right-20 w-[120%] h-80 bg-brand-green rounded-[100%] border-t-8 border-green-400 shadow-lg transform rotate-3 opacity-90"></div>
        
        {/* Pond */}
        <div className="absolute -bottom-10 -right-10 w-80 h-64 bg-blue-400 rounded-full border-4 border-blue-300 opacity-90 transform -rotate-6"></div>

        {/* Land Animals */}
        <div className="absolute bottom-64 left-16 text-brand-green/30 transform rotate-12">
           <Cat size={64} />
        </div>
        <div className="absolute bottom-40 left-1/4 text-yellow-800/20 transform -rotate-6">
           <Dog size={80} />
        </div>
        <div className="absolute bottom-20 left-1/3 text-white/40 transform rotate-12">
           <Rabbit size={50} />
        </div>
        <div className="absolute bottom-32 left-10 text-pink-300/60 transform -rotate-12">
            <Snail size={40} />
        </div>
        <div className="absolute bottom-48 right-1/2 text-red-400/40 transform rotate-45">
            <Bug size={32} />
        </div>

        {/* Pond Animals */}
        <div className="absolute bottom-10 right-20 text-blue-100 transform -rotate-12 animate-bounce-slow" style={{ animationDuration: '3s' }}>
           <Fish size={48} />
        </div>
        <div className="absolute bottom-24 right-6 text-green-900/40 transform rotate-12">
           <Turtle size={56} />
        </div>
        <div className="absolute bottom-8 right-48 text-blue-200 transform rotate-180 opacity-60">
           <Fish size={32} />
        </div>

      </div>

      <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl animate-fade-in z-10 border-4 border-white">
        <div className="flex items-center space-x-4 mb-8 justify-center">
            <div className="bg-brand-orange p-3 rounded-full text-white shadow-lg transform -rotate-12">
               <PawPrint size={40} fill="currentColor" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-brand-orange drop-shadow-md text-center">
            Mini Zoo
            </h1>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <ZooButton onClick={() => onNavigate(Screen.ThemeSelect)} color="bg-brand-green" className="w-64 flex items-center justify-center hover:bg-green-500">
            <Play className="mr-3" />
            Play
          </ZooButton>
          <ZooButton onClick={() => onNavigate(Screen.Collection)} color="bg-brand-yellow" className="w-64 flex items-center justify-center hover:bg-yellow-400 text-yellow-900">
            <Star className="mr-3" />
            Collection
          </ZooButton>
          <ZooButton onClick={() => onNavigate(Screen.Settings)} color="bg-brand-purple" className="w-64 flex items-center justify-center hover:bg-purple-500">
            <SettingsIcon className="mr-3" />
            Settings
          </ZooButton>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
