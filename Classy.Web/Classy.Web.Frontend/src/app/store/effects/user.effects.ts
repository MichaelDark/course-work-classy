import { Injectable } from '@angular/core';
import { UserActions } from '@classy/store/actions';
import { Observable, of, from } from 'rxjs';
import {
  tap,
  map,
  mapTo,
  debounce,
  debounceTime,
  switchMap,
  switchMapTo
} from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '@classy/core/services/user.service';

@Injectable()
export class UserEffects {

  @Effect()
  requestId$ = this.actions$.pipe(
    ofType(UserActions.requestId.type),
    //debounceTime(1000),
    switchMapTo(this.userService.requestUserId()),
    map(id => UserActions.assignId({ id }))
  );
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

}
