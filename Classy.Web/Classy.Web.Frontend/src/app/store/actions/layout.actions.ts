import { createAction, union, props } from '@ngrx/store';
import { Progress } from '@classy/store/models';

export const doNothing = createAction('[Layout] Empty action');

export const setProgress = createAction(
  '[Layout] Set progress',
  props<{ progress: Progress }>()
);

export const startProgress = createAction(
  '[Layout] Start progress',
  props<{ progress: Progress }>()
);

export const updateCurrent = createAction(
  '[Layout] Update current',
  props<{ text: string }>()
);

export const updateProgress = createAction(
  '[Layout] Update progress'
  /* props<{ progress: Progress }>()*/
);

export const endProgress = createAction('[Layout] End progress');

const all = union({
  doNothing,
  setProgress,
  startProgress,
  updateCurrent,
  updateProgress,
  endProgress
});
export type LayoutActionsUnion = typeof all;