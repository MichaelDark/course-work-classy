import { Action, createAction, union } from '@ngrx/store';

export const showProgressBar = createAction('[Layout] Show progress bar');
export const hideProgressBar = createAction('[Layout] Hide progress bar');

const all = union({ showProgressBar, hideProgressBar });
export type LayoutActionsUnion = typeof all;