import { UserActions } from '@classy/store/actions';

export interface UserState { }

const initialState = { };

export function reducer(
  state: UserState = initialState,
  action: UserActions.UserActionsUnion
) {
  switch (action.type) {
    case UserActions.requestId.type: {
      return state;
    }
    default: {
      return state;
    }
  }
}
