import { LayoutActions } from '../actions';
import { Progress } from '../models';

export interface LayoutState {
  progress: Progress;
}

const initialState = {
  progress: null /*{
    header: 'Classifying images...',
    text: 'image.png',
    current: 0,
    max: 3
  }*/
}

export function reducer(
  state: LayoutState = initialState,
  action: LayoutActions.LayoutActionsUnion
): LayoutState {
  switch (action.type) {
    case LayoutActions.startProgress.type: {
      return { ...state, progress: action.progress };
    }
    case LayoutActions.updateCurrent.type: {
      return { ...state, progress: { ...state.progress, text: action.text }};
    }
    case LayoutActions.updateProgress.type: {
      const progress = {
        ...state.progress,
        current: state.progress.current + 1
      }
      return { ...state, progress };
    }
    case LayoutActions.endProgress.type: {
      //return { ...state, progress: null };
      return state;
    }
    default: {
      return state;
    }
  }
}

export const getProgress = (state: LayoutState): Progress => state.progress;
