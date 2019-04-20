import { Injectable } from '@angular/core';

import { of, from } from 'rxjs';
import {
  tap,
  map,
  first,
  flatMap,
  mapTo,
  pairwise
} from 'rxjs/operators';
import { LayoutActions, ImageActions } from '@classy/store/actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FileClass } from '@classy/store/models';

import { ImagesService } from '@classy/core/services/images.service';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';

@Injectable()
export class ImageEffects {

  @Effect()
  receive$ = this.actions$.pipe(
    ofType(ImageActions.receive.type),
    map((action: any) => action.file),
    map((file: File) => ImageActions.sendToServer({ file }))
  );

  @Effect()
  classificationComplete$ = this.actions$.pipe(
    ofType(ImageActions.classificationComplete.type),
    map((action: any) => action.fileClass),
    map((fileClass: FileClass) => LayoutActions.updateProgress({ text: fileClass.fileName }))
  );

  @Effect()
  sendImages$ = this.actions$.pipe(
    ofType(ImageActions.sendToServer.type),
    map((action: any) => action.file),
    flatMap(file => this.imagesService.classifySingle(file)),
    map(response => {
      console.log(response);

      const fileClass = this.classificationStorageService.parseClassificationResult(response);
      this.classificationStorageService.updateClassification(fileClass);

      return ImageActions.classificationComplete({ fileClass });
    })
  );

  @Effect({ dispatch: false })
  clearClassificationStorage$ = this.actions$.pipe(
    ofType(ImageActions.clearClassificationStorage.type),
    first(),
    tap(() => this.classificationStorageService.clear())
  );
  
  constructor(
    private actions$: Actions,
    private imagesService: ImagesService,
    private classificationStorageService: ClassificationStorageService
  ) { }

}
