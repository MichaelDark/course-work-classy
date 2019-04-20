import { Injectable } from '@angular/core';
import { ImageActions } from '@classy/store/actions';
import { of, from } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ImagesService } from '@classy/core/services/images.service';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';

@Injectable()
export class ImageEffects {

  @Effect()
  receive$ = this.actions$.pipe(
    ofType(ImageActions.receive.type),
    map((action: any) => action.file),
    map(file => ImageActions.sendToServer({ file }))
  );

  @Effect({ dispatch: false })
  sendImages$ = this.actions$.pipe(
    ofType(ImageActions.sendToServer.type),
    map((action: any) => action.file),
    map(file => this.imagesService.classifySingle(file))
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
