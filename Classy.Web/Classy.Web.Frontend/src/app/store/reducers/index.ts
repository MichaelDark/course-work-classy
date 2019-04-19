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

export interface State {
  user: fromUser.UserState,
  images: fromImages.ImageState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  images: fromImages.reducer
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
