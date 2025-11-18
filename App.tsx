
import React, { useState, useEffect, useCallback } from 'react';
import { Screen, GameState, Level, Theme, Settings } from './types';
import { THEMES, LEVELS } from './constants';
import { ProgressService } from './services/progressService';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import ThemeSelectScreen from './components/ThemeSelectScreen';
import LevelSelectScreen from './components/LevelSelectScreen';
import PuzzleScreen from './components/PuzzleScreen';
import WinScreen from './components/WinScreen';
import CollectionScreen from './components/CollectionScreen';
import SettingsScreen from './components/SettingsScreen';
import { AudioProvider } from './hooks/useAudio';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: Screen.Splash,
    unlockedLevels: ['farm-1'],
    unlockedAnimals: [],
    settings: { music: true, effects: true },
  });
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);

  useEffect(() => {
    const loadedState = ProgressService.loadProgress();
    if (loadedState) {
      setGameState(loadedState);
    }
    setTimeout(() => {
      setGameState(prevState => ({ ...prevState, screen: Screen.Home }));
    }, 2500);
  }, []);

  const saveProgress = useCallback((newState: GameState) => {
    setGameState(newState);
    ProgressService.saveProgress(newState);
  }, []);
  
  const handleLevelComplete = (levelId: string) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;
    
    const currentIndex = LEVELS.findIndex(l => l.id === levelId);
    const nextLevel = LEVELS[currentIndex + 1];

    const newUnlockedLevels = [...gameState.unlockedLevels];
    if (nextLevel && !newUnlockedLevels.includes(nextLevel.id)) {
      newUnlockedLevels.push(nextLevel.id);
    }

    const newUnlockedAnimals = [...gameState.unlockedAnimals];
    if (!newUnlockedAnimals.includes(level.animalName)) {
        newUnlockedAnimals.push(level.animalName);
    }

    saveProgress({
      ...gameState,
      unlockedLevels: newUnlockedLevels,
      unlockedAnimals: newUnlockedAnimals,
    });
    
    setCurrentLevel(level);
    setGameState(prevState => ({ ...prevState, screen: Screen.Win }));
  };
  
  const navigate = (screen: Screen) => {
    setGameState(prevState => ({...prevState, screen }));
  };
  
  const selectTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    navigate(Screen.LevelSelect);
  };
  
  const selectLevel = (level: Level) => {
    setCurrentLevel(level);
    navigate(Screen.Puzzle);
  };

  const updateSettings = (newSettings: Settings) => {
    saveProgress({ ...gameState, settings: newSettings });
  };

  const renderScreen = () => {
    switch (gameState.screen) {
      case Screen.Splash:
        return <SplashScreen />;
      case Screen.Home:
        return <HomeScreen onNavigate={navigate} />;
      case Screen.ThemeSelect:
        return <ThemeSelectScreen themes={THEMES} onSelectTheme={selectTheme} onBack={() => navigate(Screen.Home)} />;
      case Screen.LevelSelect:
        if (!currentTheme) {
            navigate(Screen.ThemeSelect);
            return null;
        }
        return <LevelSelectScreen 
          theme={currentTheme} 
          levels={LEVELS.filter(l => l.theme === currentTheme.id)} 
          unlockedLevels={gameState.unlockedLevels}
          onSelectLevel={selectLevel} 
          onBack={() => navigate(Screen.ThemeSelect)}
        />;
      case Screen.Puzzle:
        if (!currentLevel) {
            navigate(Screen.Home);
            return null;
        }
        return <PuzzleScreen 
          level={currentLevel} 
          onComplete={() => handleLevelComplete(currentLevel.id)}
          onBack={() => navigate(Screen.LevelSelect)}
        />;
      case Screen.Win:
        if (!currentLevel) {
            navigate(Screen.Home);
            return null;
        }
        const currentIndex = LEVELS.findIndex(l => l.id === currentLevel.id);
        const nextLevel = LEVELS[currentIndex + 1];

        return <WinScreen 
          animalName={currentLevel.animalName}
          onNextLevel={nextLevel && gameState.unlockedLevels.includes(nextLevel.id) ? () => selectLevel(nextLevel) : undefined}
          onGoToCollection={() => navigate(Screen.Collection)}
          onGoHome={() => navigate(Screen.Home)}
        />;
      case Screen.Collection:
        return <CollectionScreen 
          unlockedAnimals={gameState.unlockedAnimals}
          onBack={() => navigate(Screen.Home)}
        />;
      case Screen.Settings:
        return <SettingsScreen
          settings={gameState.settings}
          onSettingsChange={updateSettings}
          onBack={() => navigate(Screen.Home)}
        />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <AudioProvider settings={gameState.settings}>
      <div className="w-screen h-screen bg-brand-bg font-sans text-gray-800 overflow-hidden">
        {renderScreen()}
      </div>
    </AudioProvider>
  );
};

export default App;
