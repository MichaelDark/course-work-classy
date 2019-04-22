import { LayoutActions } from '../actions';
import { Progress } from '../models';

export interface LayoutState {
  progress: Progress;
  currentFolder: null | string;
}

const initialState = {
  progress: null,
  currentFolder: null
};

export function reducer(
  state: LayoutState = initialState,
  action: LayoutActions.LayoutActionsUnion
): LayoutState {
  switch (action.type) {
    case LayoutActions.startProgress.type: {
      return { ...state, progress: action.progress };
    }
    case LayoutActions.setProgress.type: {
      return { ...state, progress: { ...state.progress, current: action.current, text: action.text } };
    }
    case LayoutActions.updateCurrent.type: {
      return { ...state, progress: { ...state.progress, text: action.text } };
    }
    case LayoutActions.updateProgress.type: {
      return { ...state, progress: { ...state.progress, current: state.progress.current + 1 } };
    }
    case LayoutActions.endProgress.type: {
      return { ...state, progress: null };
    }
    case LayoutActions.completeClassification.type: {
      console.log('progress ', action.i + 1);
      return { ...state, progress: { ...state.progress, current: action.i + 1 } };
    }
    case LayoutActions.setCurrentFolderClass.type: {
      return {...state, currentFolder: action.currentFolder}
    }
    case LayoutActions.removeCurrentFolderClass.type: {
      return {...state, currentFolder: null };
    }

    default: {
      return state;
    }
  }
}

export const getProgress = (state: LayoutState): Progress => state.progress;
