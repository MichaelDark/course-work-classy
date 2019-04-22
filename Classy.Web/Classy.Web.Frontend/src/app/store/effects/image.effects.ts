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
  merge
} from 'rxjs/operators';
import { LayoutActions, ImageActions } from '@classy/store/actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FileClass } from '@classy/store/models';

import { ImagesService } from '@classy/core/services/images.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { ClassyDataObject } from '../models/image.model';

@Injectable()
export class ImageEffects {

  // @Effect()
  // receive$ = this.actions$.pipe(
  //   ofType(ImageActions.receive.type),
  //   map((action: any): File => action.file),
  //   map((file: File, i: number) => {
  //     console.log('effect ImageActions.receive', i);
  //     return LayoutActions.setProgress({ current: i, text: file.name, file });
  //       //LayoutActions.completeClassification({ i })

  //       //ImageActions.sendToServer({ file }),
  //       //LayoutActions.updateCurrent({ text: file.name }),
  //       //LayoutActions.updateProgress(/*{ text: file.name }*/)
  //   })
  // );

  // @Effect()
  // setProgress$ = this.actions$.pipe(
  //   ofType(LayoutActions.setProgress.type),
  //   map((action: any): File => action.file),
  //   flatMap((file, i) => {
  //     console.log('effect LayoutActions.setProgress');
  //     return this.imagesService.classifyAndSave(file, i);
  //   })
  // );

  // @Effect()
  // classificationResponse$ = this.actions$.pipe(
  //   ofType(ImageActions.classificationResponse.type),
  //   map((fileClass: FileClass, i: number) => LayoutActions.completeClassification({ i }))
  // );

  // @Effect()
  // sendImages$ = this.actions$.pipe(
  //   ofType(ImageActions.sendToServer.type),
  //   map((action: any): File => action.file),
  //   // Insert LayoutActions.updateCurrent here
  //   // concatMap(file => [
  //   //   LayoutActions.updateCurrent({ text: file.name }),
  //   //   this.imagesService.classifySingle(file)
  //   // ]),
  //   //tap(file => this.store.dispatch(LayoutActions.updateCurrent({ text: file.name }))),
  //   flatMap(file => this.imagesService.classifySingle(file)),
  //   map(response => this.imagesService.parseResponseAndSave(response)),
  //   concatMap((fileClass, i) => [
  //     LayoutActions.setProgress({ current: i, text: fileClass.fileName }),
  //     ImageActions.classificationResponse({ fileClass, i }),
  //     //LayoutActions.updateProgress()
  //   ])
  // );

  // @Effect({ dispatch: false })
  // clearClassificationStorage$ = this.actions$.pipe(
  //   ofType(ImageActions.clearClassificationStorage.type),
  //   first(),
  //   tap(() => this.classificationStorageService.clear())
  // );
  
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private imagesService: ImagesService
  ) { }

}
