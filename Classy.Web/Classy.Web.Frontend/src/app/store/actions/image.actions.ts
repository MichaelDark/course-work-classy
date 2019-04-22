import { createAction, union, props } from '@ngrx/store';
import { Image, FileClass } from '@classy/store/models';

export const receive = createAction(
  '[Image] Receive',
  props<{ file: File }>()
);

export const sendToServer = createAction(
  '[Image] Send to server',
  props<{ file: File }>()
);

export const classificationResponse = createAction(
  '[Image] Classification response',
  props<{ fileClass: FileClass, i: number }>()
);

export const clearClassificationStorage = createAction('[Image] Clear classification storage');

const all = union({
  receive,
  sendToServer,
  classificationResponse,
  clearClassificationStorage
});
export type ImageActionsUnion = typeof all;
