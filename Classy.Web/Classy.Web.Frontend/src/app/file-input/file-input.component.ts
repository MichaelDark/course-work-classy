import { Component } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as signalR from '@aspnet/signalr';
import { OnInit } from '@angular/core';
import { send } from 'q';


@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})


export class FileInputComponent implements OnInit {

  constructor(){
  }

  public files: UploadFile[] = [];
  public commonFiles: File[] = [];

 connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl('https://localhost:44374/classy', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

  ngOnInit() {
  }

  public dropped(event: UploadEvent) {
    this.files = this.files.concat(event.files);

    for (const droppedFile of event.files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.commonFiles.push(file);
          console.log(droppedFile.relativePath, file);

        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

 public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  removeAll(): void  {
    this.files.length = 0;
    this.commonFiles.length = 0;

  }

  remove(num: number): void {
    this.files.splice(num, 1);
    this.commonFiles.splice(num, 1);
  }

  startStreaming() {

    const connect = this.connection;
    const parent = this;

    const myReader: FileReader = new FileReader();

    myReader.onload = function() {
      console.log(myReader.result);
    }

    myReader.readAsDataURL(parent.commonFiles[0]);
    console.log(myReader.result);

    connect.start()
  .then(function() {
    console.log('connection started');
    connect.on('response', x => {
      alert(x);
    });

    //connect.send('sendTest', 'Slava Ukraine');
    connect.send('sendTest', myReader.result);
  })
    .catch(err => {
      console.error((err));
    });
  }
}

