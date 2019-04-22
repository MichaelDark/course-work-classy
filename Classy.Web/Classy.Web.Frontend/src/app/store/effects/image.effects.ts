import { Injectable } from '@angular/core';

import { of, from, concat, Observable, identity } from 'rxjs';
import {
  tap,
  map,
  first,
  flatMap,
  mapTo,
  pairwise,
  mergeMap,
  concatMap,
  merge,
  find,
  take,
  switchMap,
  debounceTime
} from 'rxjs/operators';
import { LayoutActions, ImageActions } from '@classy/store/actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  FileClass,
  ClassyDataObject,
  classyDataObject2fileClass
} from '@classy/store/models';

import { ImagesService } from '@classy/core/services/images.service';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Injectable()
export class ImageEffects {

  @Effect()
  fetchClass$ = this.actions$.pipe(
    ofType(ImageActions.fetchClass.type),
    map((action: any): ClassyDataObject => action.classyDataObject),
    map(classyDataObject2fileClass),
    map(fileClass => ImageActions.assignClass({ fileClass }))
  )
  
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private imagesService: ImagesService
  ) { }

}
