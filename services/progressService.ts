
import { GameState, Screen } from '../types';

const PROGRESS_KEY = 'miniZooPuzzlesProgress';

export class ProgressService {
  public static saveProgress(state: GameState): void {
    try {
      const stateToSave = {
        ...state,
        screen: undefined // Don't save the current screen
      };
      const serializedState = JSON.stringify(stateToSave);
      localStorage.setItem(PROGRESS_KEY, serializedState);
    } catch (error) {
      console.error("Could not save progress", error);
    }
  }

  public static loadProgress(): GameState | null {
    try {
      const serializedState = localStorage.getItem(PROGRESS_KEY);
      if (serializedState === null) {
        return null;
      }
      const loadedState = JSON.parse(serializedState);
      return {
        ...loadedState,
        screen: Screen.Home // Always start at home after loading
      };
    } catch (error) {
      console.error("Could not load progress", error);
      return null;
    }
  }
}
