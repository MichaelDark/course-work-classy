import { Component, Output, EventEmitter } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent {

  @Output() receive = new EventEmitter<UploadFile[]>();

  dropped(event: UploadEvent) {
    // event.files.forEach(file => {
    //   const file2 = file.fileEntry as FileSystemFileEntry;
    //   file2.file()
    // });
    this.receive.emit(event.files);
  }

}
