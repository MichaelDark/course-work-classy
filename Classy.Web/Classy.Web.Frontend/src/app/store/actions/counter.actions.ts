import { createAction, union, props } from '@ngrx/store';

export const increment = createAction(
    '[Counter] Increment',
    props<{ diff: number }>()
);

export const decrement = createAction(
    '[Counter] Decrement',
    props<{ diff: number }>()
);

const all = union({ increment, decrement });
export type CounterActionsUnion = typeof all;
