import { Component } from '@angular/core';
import { 
  UploadFile,
  UploadEvent,
  FileSystemEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from 'ngx-file-drop';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { ImageActions } from '@classy/store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  files$ = this.store.pipe(select(fromRoot.getImagesState));

  constructor(private store: Store<fromRoot.State>) { }

  onFileDrop(event: UploadEvent) {
    // Is it a file?
    for (const droppedFile of event.files) {
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
    }
  }

}
