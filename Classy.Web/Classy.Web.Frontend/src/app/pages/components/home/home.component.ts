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
import { from } from 'rxjs';
import { Progress } from '@classy/store/models';
import { tap, map, finalize, startWith } from 'rxjs/operators';
import { ImagesService } from '@classy/core/services/images.service';

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
    const progress: Progress = {
      header: 'Classification',
      text: /* 'image.png' */ event.files[0].fileEntry.name,
      current: 0,
      max: event.files.length
    }
    this.store.dispatch(LayoutActions.startProgress({ progress }));

    let current: number = 0;
    let max: number = event.files.length;

    for (let droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.store.dispatch(ImageActions.receive({ file }));

          this.imagesService
            .classifyAndSave(file, current).toPromise()
            .then(() => {
              this.store.dispatch(LayoutActions.setProgress({ current, text: file.name }));
            })
            .then(() => {
              this.store.dispatch(LayoutActions.completeClassification({ i: current }));
              ++current;
            })
        });
      }
    }
  }

  increment() {
    new Promise(() => console.log('increment')).then(() => {});
  }

}
