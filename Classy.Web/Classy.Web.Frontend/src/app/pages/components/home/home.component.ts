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
import { tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images$ = this.store.pipe(select(fromRoot.getImagesState));

  constructor(private store: Store<fromRoot.State>) { }

  onFileDrop(event: UploadEvent) {
    this.store.dispatch(
      LayoutActions.setClassificationProgressMax({ value: event.files.length })
    );

    this.store.dispatch(
      LayoutActions.setClassificationProgressCurrent({ value: 0 })
    );

    from<UploadFile>(event.files)
      .subscribe(droppedFile => {
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.store.dispatch(ImageActions.receive({ file }));
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      });
  }

}
