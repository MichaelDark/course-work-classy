import { createAction, union, props } from '@ngrx/store';

export const requestId = createAction(
  '[User] Request id'
);
export const assignId = createAction(
  '[User] Assign id',
  props<{ id: string }>()
);

const all = union({ requestId, assignId });
export type UserActionsUnion = typeof all;
