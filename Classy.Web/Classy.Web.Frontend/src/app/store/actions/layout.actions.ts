import { createAction, union, props } from '@ngrx/store';

export const startProgress = createAction(
  '[Layout] Start progress',
  props<{ progress: any }>()
);

export const updateProgress = createAction('[Layout] Update progress');

export const endProgress = createAction('[Layout] End progress');

const all = union({
  startProgress,
  updateProgress,
  endProgress
});
export type LayoutActionsUnion = typeof all;