import { Injectable } from '@angular/core';

import { of, from, Observable, fromEvent, Subscriber } from 'rxjs';
import { map, flatMap, tap, pluck } from 'rxjs/operators';
import { ImageActions, LayoutActions } from '@classy/store/actions';
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
import { UploadFile, FileSystemFileEntry } from 'ngx-file-drop';

@Injectable()
export class ImageEffects {

  @Effect({ dispatch: false })
  classifyAll$ = this.actions$.pipe(
    ofType(ImageActions.classifyAll.type),
    map((action: any): UploadFile[] => action.uploadFiles),
    tap(uploadFiles => {
      let [current, max] = [0, uploadFiles.length];
      for (let droppedFile of uploadFiles) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.store.dispatch(ImageActions.receive({ file }));
            this.imagesService
              .classifySingle(file)
              .toPromise()
              .then(classyDataObject => {
                this.store.dispatch(ImageActions.fetchClass({ classyDataObject }));
                this.store.dispatch(LayoutActions.setProgress({ current, text: file.name }));
                this.store.dispatch(LayoutActions.completeClassification({ i: current }));
                ++current;
              })
              .finally(() => {
                if (current === max) {
                  setTimeout(() => {
                    this.store.dispatch(LayoutActions.hideProgress());
                  }, 3000);
                }
              })
          });
        }
      }
    })
  );

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
