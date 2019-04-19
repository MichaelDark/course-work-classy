import { createAction, union, props } from '@ngrx/store';

export const receive = createAction(
  '[Image] Receive',
  props<{ file: File }>()
);
export const classificationComplete = createAction('[Image] Classification complete');

const all = union({
  receive,
  classificationComplete
});
export type ImageActionsUnion = typeof all;
