import { createAction, union, props } from '@ngrx/store';

export const receive = createAction(
    '[Image] Receive',
    props<{ file: File }>()
);

const all = union({ receive });
export type ImageActionsUnion = typeof all;
