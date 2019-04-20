import { createAction, union, props } from '@ngrx/store';

export const receive = createAction(
    '[Image] Receive',
    props<{ file: File }>()
);

export const clearClassificationStorage = createAction(
    '[Image] Clear classification storage'
);

const all = union({ receive, clearClassificationStorage });
export type ImageActionsUnion = typeof all;
