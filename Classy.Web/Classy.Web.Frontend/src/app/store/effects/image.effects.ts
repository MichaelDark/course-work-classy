import { Injectable } from '@angular/core';
import { ImageActions } from '@classy/store/actions';
import { tap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ImagesService } from '@classy/core/services/images.service';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';

@Injectable()
export class ImageEffects {

  @Effect({ dispatch: false })
  sendImages$ = this.actions$.pipe(
    ofType(ImageActions.receive.type),
    map((action: any) => action.file),
    tap(file => {
      console.log('receive image effect');
      this.imagesService.classifySingle(file).subscribe(response => {
        console.log(response);
        const classificationResult = this.classificationStorageService.parseClassificationResult(response);
        const { fileName, className } = classificationResult;
        this.classificationStorageService.updateClassification({ fileName, className });
      });
    }),
  );

  constructor(
    private actions$: Actions,
    private imagesService: ImagesService,
    private classificationStorageService: ClassificationStorageService 
  ) { }

}
