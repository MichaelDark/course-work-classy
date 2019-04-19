import { createAction, union, props } from '@ngrx/store';

export const showProgress = createAction('[Layout] Show progress');

export const hideProgress = createAction('[Layout] Hide progress');

export const setClassificationProgressCurrent = createAction(
  '[Layout] Set classification progress CURRENT',
  props<{ value: number | null }>()
);

export const setClassificationProgressMax = createAction(
  '[Layout] Set classification progress MAX',
  props<{ value: number | null }>()
);

export const updateClassificationProgress = createAction('[Layout] Update classification progress');

const all = union({
  showProgress,
  hideProgress,
  setClassificationProgressCurrent,
  setClassificationProgressMax,
  updateClassificationProgress
});
export type LayoutActionsUnion = typeof all;