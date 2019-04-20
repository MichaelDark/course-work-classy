import { LayoutActions } from '../actions';

export interface Progress {
  header: string;
  text: string;
  current: number;
  max: number;
}

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
    case LayoutActions.showProgress.type: {
      //return { ...state, showProgress: true };
      return state;
    }
    case LayoutActions.hideProgress.type: {
      //return { ...state, showProgress: false };
      return state;
    }
    case LayoutActions.setClassificationProgressCurrent.type: {
      //return { ...state, classificationProgressCurrent: action.value };
      return state;
    }
    case LayoutActions.setClassificationProgressMax.type: {
      //return { ...state, classificationProgressMax: action.value };
      return state;
    }
    case LayoutActions.updateClassificationProgress.type: {
      // const count = state.classificationProgressCurrent + 1;
      // if (count == state.classificationProgressMax) {
      //   return {
      //     showProgress: false,
      //     classificationProgressCurrent: null,
      //     classificationProgressMax: null,
      //     fileNameCurrent: null
      //   }
      // } else {
      //   return {
      //     ...state,
      //     classificationProgressCurrent: state.classificationProgressCurrent + 1,
      //     fileNameCurrent: action.fileName
      //   };
      // }
      return state;
    }
    default: {
      return state;
    }
  }
}

export const getProgress = (state: LayoutState) => state.progress;
