import { createAction, union, props } from '@ngrx/store';

export const requestId = createAction('[User] Request id');

const all = union({ requestId });
export type UserActionsUnion = typeof all;
