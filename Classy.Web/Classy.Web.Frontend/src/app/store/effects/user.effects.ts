import { Injectable } from '@angular/core';
import { UserActions } from '@classy/store/actions';
import { Observable, of, from } from 'rxjs';
import { tap, map, debounce, debounceTime } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '@classy/core/services/user.service';

@Injectable()
export class UserEffects {

  @Effect()
  requestId$ = this.actions$.pipe(
    ofType(UserActions.requestId.type),
    debounceTime(1000),
    tap(() => {
      console.log('user request id effect');
      return UserActions.assignId({ id: '123' });
      //return this.userService.requestUserId()
      // .pipe(
      //   map(id => {
      //     console.log('return action assign id');
      //     return UserActions.assignId({ id });
      //   })
      // )
    })
  );
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

}
