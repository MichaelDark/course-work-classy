import { UserActions } from '@classy/store/actions';

export interface UserState {
  id: string | null;
}

const initialState = {
  id: null
};

export function reducer(
  state: UserState = initialState,
  action: UserActions.UserActionsUnion
) {
  switch (action.type) {
    case UserActions.requestId.type: {
      return state;
    }
    case UserActions.assignId.type: {
      return { ...state, id: action.id };
    }
    default: {
      return state;
    }
  }
}
