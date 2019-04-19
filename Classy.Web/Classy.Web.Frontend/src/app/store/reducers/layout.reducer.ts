import { LayoutActions } from '../actions';

export interface LayoutState {
  showProgress: boolean;
  classificationProgressCurrent: number | null;
  classificationProgressMax: number | null;
}

const initialState = {
  showProgress: true,
  classificationProgressCurrent: null,
  classificationProgressMax: null
}

export function reducer(
  state: LayoutState = initialState,
  action: LayoutActions.LayoutActionsUnion
): LayoutState {
  switch (action.type) {
    case LayoutActions.showProgress.type: {
      return { ...state, showProgress: true };
    }
    case LayoutActions.hideProgress.type: {
      return { ...state, showProgress: false };
    }
    case LayoutActions.setClassificationProgressCurrent.type: {
      return { ...state, classificationProgressCurrent: action.value };
    }
    case LayoutActions.setClassificationProgressMax.type: {
      return { ...state, classificationProgressMax: action.value };
    }
    case LayoutActions.updateClassificationProgress.type: {
      return { ...state, classificationProgressCurrent: state.classificationProgressCurrent + 1 };
    }
    default: {
      return state;
    }
  }
}
