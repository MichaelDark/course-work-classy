import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUser from './user.reducer';
import * as fromImages from './image.reducer';
import * as fromLayout from './layout.reducer';

export interface State {
  user: fromUser.UserState,
  images: fromImages.ImageState;
  layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  images: fromImages.reducer,
  layout: fromLayout.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const getUserState = createFeatureSelector<State, fromUser.UserState>('user');
export const getImagesState = createFeatureSelector<State, fromImages.ImageState>('images');
export const getLayoutState = createFeatureSelector<State, fromLayout.LayoutState>('layout');

export const getProgressState = createSelector(getLayoutState, fromLayout.getProgress);
export const getCurrentFolderState = createSelector(getLayoutState, fromLayout.getCurrentFolder);
