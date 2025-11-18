import * as React from 'react';

export enum Screen {
  Splash = 'SPLASH',
  Home = 'HOME',
  ThemeSelect = 'THEME_SELECT',
  LevelSelect = 'LEVEL_SELECT',
  Puzzle = 'PUZZLE',
  Win = 'WIN',
  Collection = 'COLLECTION',
  Settings = 'SETTINGS',
}

export interface Settings {
  music: boolean;
  effects: boolean;
}

export interface GameState {
  screen: Screen;
  unlockedLevels: string[];
  unlockedAnimals: string[];
  settings: Settings;
}

export interface Theme {
  id: string;
  name: string;
  color: string;
  // FIX: Changed from JSX.Element to React.ReactNode/ReactElement for better compatibility in .ts files
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

export interface Level {
  id: string;
  theme: string;
  animalName: string;
  pieces: number;
}

export interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  bgPosX: number;
  bgPosY: number;
}

export interface DraggablePieceState {
  id: number;
  currentPos: { x: number; y: number };
  isDragging: boolean;
  isSnapped: boolean;
  zIndex: number;
}