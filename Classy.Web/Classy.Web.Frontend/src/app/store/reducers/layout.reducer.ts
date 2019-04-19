import { LayoutActions } from '../actions';

export interface LayoutState {
  showProgressBar: boolean;
  progressBarCurrent: number | null;
  progressBarMax: number | null;
}

const initialState = {
  showProgressBar: true,
  progressBarCurrent: null,
  progressBarMax: null
}

export function reducer(
  state: LayoutState = initialState,
  action: LayoutActions.LayoutActionsUnion
) {
  switch (action.type) {
    case LayoutActions.showProgressBar.type: {
      return { ...state, showProgressBar: true };
    }
    case LayoutActions.hideProgressBar.type: {
      return { ...state, showProgressBar: false };
    }
    default: {
      return state;
    }
  }
}
