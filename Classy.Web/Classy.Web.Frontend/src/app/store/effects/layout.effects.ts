import { Progress } from '@classy/store/models';
import { Injectable } from '@angular/core';
import { ImageActions, LayoutActions } from '@classy/store/actions';
import { Observable, of, iif } from 'rxjs';
import { tap, map, switchMap, ignoreElements, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ImagesService } from '@classy/core/services/images.service';

@Injectable()
export class LayoutEffects {

  constructor(
    private actions$: Actions
  ) { }

}
