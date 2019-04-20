import { createAction, union, props } from '@ngrx/store';
import { Progress } from '@classy/store/models';

export const startProgress = createAction(
  '[Layout] Start progress',
  props<{ progress: Progress }>()
);

export const updateProgress = createAction(
  '[Layout] Update progress',
  props<{ progress: Progress }>()
);

export const endProgress = createAction('[Layout] End progress');

const all = union({
  startProgress,
  updateProgress,
  endProgress
});
export type LayoutActionsUnion = typeof all;