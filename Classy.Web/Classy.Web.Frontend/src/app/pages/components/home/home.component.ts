import { Component } from '@angular/core';
import {
  UploadFile,
  UploadEvent,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from 'ngx-file-drop';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { ImageActions, LayoutActions } from '@classy/store/actions';
import { Progress } from '@classy/store/models';
import { ImagesService } from '@classy/core/services/images.service';
import { FileClass } from '@classy/store/models/image.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images$ = this.store.pipe(select(fromRoot.getImagesState));

  constructor(
    private store: Store<fromRoot.State>,
    private imagesService: ImagesService
  ) { }

  onFileDrop(event: UploadEvent) {
    let current = 0;
    let max = event.files.length;

    this.dispatchProgressStart({
      header: 'Classification',
      text: event.files[0].fileEntry.name,
      textComplete: 'Complete',
      current: current,
      max: max
    });

    for (let droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.store.dispatch(ImageActions.receive({ file }));
          this.imagesService
            .classifySingle(file).toPromise()
            .then(classyDataObject => {
              this.store.dispatch(ImageActions.fetchClass({ classyDataObject }));
            // })
            // .then(() => {
              this.store.dispatch(LayoutActions.setProgress({ current, text: file.name }));
            // })
            // .then(() => {
              this.store.dispatch(LayoutActions.completeClassification({ i: current }));
              ++current;
            })
            .finally(() => {
              if (current === max) {
                setTimeout(() => {
                  this.store.dispatch(LayoutActions.endProgress());
                }, 3000);
              }
            })
        });
      }
    }
  }

  private dispatchProgressStart(progress: Progress) {
    this.store.dispatch(LayoutActions.startProgress({ progress }));
  }

}
