
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LEVELS } from '../constants';

interface CollectionScreenProps {
  unlockedAnimals: string[];
  onBack: () => void;
}

const allAnimals = [...new Set(LEVELS.map(level => level.animalName))];

const CollectionScreen: React.FC<CollectionScreenProps> = ({ unlockedAnimals, onBack }) => {
  return (
    <div className="w-full h-full flex flex-col items-center p-4 pt-20 bg-brand-purple overflow-y-auto">
      <h1 className="text-5xl md:text-7xl font-display text-white mb-8 drop-shadow-lg">My Collection</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-4">
        {allAnimals.map((animalName) => {
          const isUnlocked = unlockedAnimals.includes(animalName);
          return (
            <div
              key={animalName}
              className={`relative w-36 h-48 md:w-48 md:h-60 rounded-2xl shadow-lg flex flex-col justify-between p-4 transform transition-all duration-300
              ${isUnlocked ? 'bg-white' : 'bg-gray-300'}`}
            >
              <div className="w-full h-3/4 flex items-center justify-center">
                <img 
                  src={`https://picsum.photos/seed/${animalName}/128/128`} 
                  alt={animalName} 
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full object-cover transition-filter duration-300 ${isUnlocked ? 'filter-none' : 'filter grayscale'}`}
                />
              </div>
              <div className="w-full h-1/4 flex items-center justify-center">
                <h3 className={`font-display text-xl md:text-2xl text-center ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                  {isUnlocked ? animalName : '???'}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
       <button onClick={onBack} className="absolute top-6 left-6 text-white bg-black/20 rounded-full p-3 hover:bg-black/40 transition-colors">
        <ArrowLeft size={32} />
      </button>
    </div>
  );
};

export default CollectionScreen;
