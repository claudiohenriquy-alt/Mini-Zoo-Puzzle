import * as React from 'react';
import { Theme, Level } from './types';
import { PawPrint, Leaf, Fish } from 'lucide-react';

// Using 'any' for props here to avoid potential parsing issues in .ts files
// with complex generic types or JSX-like syntax.
export const THEMES: Theme[] = [
  { 
    id: 'farm', 
    name: 'Farm', 
    color: 'bg-brand-red', 
    icon: (props: any) => React.createElement(PawPrint, props) 
  },
  { 
    id: 'jungle', 
    name: 'Jungle', 
    color: 'bg-brand-green', 
    icon: (props: any) => React.createElement(Leaf, props) 
  },
  { 
    id: 'sea', 
    name: 'Sea', 
    color: 'bg-brand-blue', 
    icon: (props: any) => React.createElement(Fish, props) 
  },
];

export const LEVELS: Level[] = [
  { id: 'farm-1', theme: 'farm', animalName: 'Cow', pieces: 3 },
  { id: 'farm-2', theme: 'farm', animalName: 'Pig', pieces: 3 },
  { id: 'farm-3', theme: 'farm', animalName: 'Chicken', pieces: 4 },
  { id: 'jungle-1', theme: 'jungle', animalName: 'Lion', pieces: 4 },
  { id: 'jungle-2', theme: 'jungle', animalName: 'Monkey', pieces: 4 },
  { id: 'sea-1', theme: 'sea', animalName: 'Fish', pieces: 3 },
  { id: 'sea-2', theme: 'sea', animalName: 'Turtle', pieces: 4 },
  { id: 'farm-4', theme: 'farm', animalName: 'Rabbit', pieces: 5 },
  { id: 'jungle-3', theme: 'jungle', animalName: 'Elephant', pieces: 5 },
  { id: 'jungle-4', theme: 'jungle', animalName: 'Parrot', pieces: 6 },
];