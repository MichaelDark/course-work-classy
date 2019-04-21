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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images$ = this.store.pipe(select(fromRoot.getImagesState));

  constructor(private store: Store<fromRoot.State>) { }

  onFileDrop(event: UploadEvent) {
    const progress: Progress = {
      header: 'Classification',
      text: /* 'image.png' */ event.files[0].fileEntry.name,
      current: 0,
      max: event.files.length
    }
    this.store.dispatch(LayoutActions.startProgress({ progress }));

    from<UploadFile>(event.files).pipe(
      tap((droppedFile: UploadFile) => {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.store.dispatch(ImageActions.receive({ file }));
          });
        }
      })
    ).subscribe(() => console.log('File dropped'));
  }

}
