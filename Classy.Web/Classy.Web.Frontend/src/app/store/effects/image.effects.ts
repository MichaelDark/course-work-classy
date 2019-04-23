import { Injectable } from '@angular/core';

import { of, from, Observable, fromEvent, Subscriber } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { ImageActions } from '@classy/store/actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  Image,
  ClassyDataObject,
  classyDataObject2fileClass,
  file2ImageWithBase64
} from '@classy/store/models';

import { ImagesService } from '@classy/core/services/images.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Injectable()
export class ImageEffects {

  @Effect()
  receive$ = this.actions$.pipe(
    ofType(ImageActions.receive.type),
    map((action: any): File => action.file),
    map(file2ImageWithBase64),
    flatMap(promise => from(promise)),
    map(image => ImageActions.getBase64({ image }))
  );
  
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
