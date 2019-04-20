import { Injectable } from '@angular/core';

import { of, from, concat, Observable } from 'rxjs';
import {
  tap,
  map,
  first,
  flatMap,
  mapTo,
  pairwise,
  mergeMap,
  concatMap
} from 'rxjs/operators';
import { LayoutActions, ImageActions } from '@classy/store/actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FileClass } from '@classy/store/models';

import { ImagesService } from '@classy/core/services/images.service';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Injectable()
export class ImageEffects {

  @Effect()
  receive$ = this.actions$.pipe(
    ofType(ImageActions.receive.type),
    map((action: any): File => action.file),
    concatMap(file => [
      ImageActions.sendToServer({ file }),
      //LayoutActions.updateCurrent({ text: file.name }),
      //LayoutActions.updateProgress(/*{ text: file.name }*/)
    ])
  );

  // @Effect()
  // classificationComplete$ = this.actions$.pipe(
  //   ofType(ImageActions.classificationComplete.type),
  //   map((action: any) => action.fileClass),
  //   map((fileClass: FileClass) => LayoutActions.updateProgress())
  // );

  private getClassificationResults(file: File): any {
    return this.imagesService.classifySingle(file).pipe(
      map(response => {
        console.log(response);

        const fileClass = this.classificationStorageService.parseClassificationResult(response);
        this.classificationStorageService.updateClassification(fileClass);

        return fileClass;
      })
    );
  }

  @Effect()
  sendImages$ = this.actions$.pipe(
    ofType(ImageActions.sendToServer.type),
    map((action: any): File => action.file),
    // Insert LayoutActions.updateCurrent here
    // concatMap(file => [
    //   LayoutActions.updateCurrent({ text: file.name }),
    //   this.imagesService.classifySingle(file)
    // ]),
    tap(file => this.store.dispatch(LayoutActions.updateCurrent({ text: file.name }))),
    flatMap(file => this.imagesService.classifySingle(file)),
    map(response => {
      console.log(response);

      const fileClass = this.classificationStorageService.parseClassificationResult(response);
      this.classificationStorageService.updateClassification(fileClass);

      return fileClass;
    }),
    concatMap(fileClass => [
      ImageActions.classificationComplete({ fileClass }),
      LayoutActions.updateProgress()
    ])
  );

  @Effect({ dispatch: false })
  clearClassificationStorage$ = this.actions$.pipe(
    ofType(ImageActions.clearClassificationStorage.type),
    first(),
    tap(() => this.classificationStorageService.clear())
  );
  
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private imagesService: ImagesService,
    private classificationStorageService: ClassificationStorageService
  ) { }

}
