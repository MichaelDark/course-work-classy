import { Injectable } from '@angular/core';
import { UserService } from '@classy/core/services/user.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMapTo, map } from 'rxjs/operators';
import { UserActions } from '@classy/store/actions';

@Injectable()
export class UserEffects {

  @Effect()
  requestId$ = this.actions$.pipe(
    ofType(UserActions.requestId.type),
    switchMapTo(this.userService.getUserId()),
    map(id => {
      return UserActions.assignId({ id });
    })
  );
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

}
