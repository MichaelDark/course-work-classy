import { Injectable } from '@angular/core';
import { UserService } from '@classy/core/services/user.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { UserActions } from '@classy/store/actions';

@Injectable()
export class UserEffects {

  @Effect({ dispatch: false })
  requestId$ = this.actions$.pipe(
    ofType(UserActions.requestId.type),
    tap(() => this.userService.requestUserId())
  );
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

}
