import { CounterActions } from '../actions';

export interface State {
    value: number;
}

const initialState: State = {
    value: 0
};

export function reducer(
    state = initialState,
    action: CounterActions.CounterActionsUnion
): State {
    switch (action.type) {
        case CounterActions.increment.type: {
            return { ...state, value: state.value + action.diff };
        }
        case CounterActions.decrement.type: {
            return { ...state, value: state.value - action.diff };
        }
        default: {
            return state;
        }
    }
}
