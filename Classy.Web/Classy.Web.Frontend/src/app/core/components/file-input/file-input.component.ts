import { Component, Output, EventEmitter } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent {

  @Output() receive = new EventEmitter<UploadFile[]>();

  dropped(event: UploadEvent) {
    this.receive.emit(event.files);
  }

}
