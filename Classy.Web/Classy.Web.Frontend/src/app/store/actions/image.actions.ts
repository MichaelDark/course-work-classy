import { createAction, union, props } from '@ngrx/store';
import { FileClass } from '@classy/store/models';

export const receive = createAction(
  '[Image] Receive',
  props<{ file: File }>()
);

export const sendToServer = createAction(
  '[Image] Send to server',
  props<{ file: File }>()
);

export const classificationComplete = createAction(
  '[Image] Classification complete',
  props<{ fileClass: FileClass }>()
);

export const clearClassificationStorage = createAction('[Image] Clear classification storage');

const all = union({
  receive,
  sendToServer,
  classificationComplete,
  clearClassificationStorage
});
export type ImageActionsUnion = typeof all;
