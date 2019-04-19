import { Injectable } from '@angular/core';
import { LayoutActions, ImageActions } from '@classy/store/actions';
import { tap, map, switchMap, mergeMap, flatMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ImagesService } from '@classy/core/services/images.service';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';

@Injectable()
export class ImageEffects {

  @Effect()
  sendImages$ = this.actions$.pipe(
    ofType(ImageActions.receive.type),
    flatMap((action: any) => this.imagesService.classifySingle(action.file)),
    map(response => {
      console.log(response);
      const classificationResult = this.classificationStorageService.parseClassificationResult(response);
      const { fileName, className } = classificationResult;
      this.classificationStorageService.updateClassification({ fileName, className });

      return LayoutActions.updateClassificationProgress();
    })
  );

  constructor(
    private actions$: Actions,
    private imagesService: ImagesService,
    private classificationStorageService: ClassificationStorageService 
  ) { }

}
