import { LayoutActions } from '../actions';
import { Progress } from '../models';

export interface LayoutState {
  progress: null | Progress;
}

const initialState = {
  progress: {
    header: 'Classifying images...',
    text: 'image.png',
    current: 0,
    max: 3
  }
}

export function reducer(
  state: LayoutState = initialState,
  action: LayoutActions.LayoutActionsUnion
): LayoutState {
  switch (action.type) {
    case LayoutActions.startProgress.type: {
      return state;
    }
    case LayoutActions.updateProgress.type: {
      return { ...state, progress: { ...state.progress, current: state.progress.current + 1 } };
    }
    case LayoutActions.endProgress.type: {
      return { ...state, progress: null };
    }
    default: {
      return state;
    }
  }
}

export const getProgress = (state: LayoutState) => state.progress;
