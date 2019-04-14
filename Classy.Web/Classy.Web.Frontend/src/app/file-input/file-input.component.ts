import { Component } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as signalR from '@aspnet/signalr';
import { OnInit } from '@angular/core';
import {Globals} from '../globals';
import {Dictionary, DictionaryItem, imageJSON, imgFile} from '../dictionary';
import { Router } from '@angular/router';


@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})


export class FileInputComponent implements OnInit {

  constructor(private globals: Globals, private router: Router) {
  }

  public files: UploadFile[] = [];
  public commonFiles: File[] = [];
  isUploading: boolean;
  isContentShowing: boolean;
  isFoldersShowing: boolean;
  classFolders: Dictionary;
  className = "";
  dictionaryItem: DictionaryItem;


 connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl('https://localhost:44311/classy', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

  ngOnInit() {
    this.classFolders = this.globals.imageDictionary;
    this.isUploading = this.globals.isUploading;
    this.isContentShowing = this.globals.isContentShowing;
    this.isFoldersShowing = this.globals.isFoldersShowing;
  }

  public dropped(event: UploadEvent) {
        const parent = this;

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

    this.globals.isUploading = this.isUploading = false;
    this.globals.isFoldersShowing = this.isFoldersShowing = true;
    this.globals.isContentShowing = this.isContentShowing = false;

    for(let i = 0; i < this.commonFiles.length; i++) {

    const connect = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl('https://localhost:44311/classy', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
    const parent = this;

    const myReader: FileReader = new FileReader();

    myReader.onload = function() {
    }

    myReader.readAsDataURL(parent.commonFiles[i]);

    connect.start()
     .then(function() {
    console.log('connection started');
    connect.on('response', x => {
      let jsonObj: any = JSON.parse(x);
      let imgClass: imageJSON = <imageJSON>jsonObj;
      let imageFile = new imgFile(myReader.result.toString(), parent.commonFiles[i].name)
      parent.globals.imageDictionary.addImage(imgClass.image, imageFile);
    });

    connect.send('sendTest', myReader.result, parent.commonFiles[i].type)
    .then(()=>console.log(myReader.result));
  })
    .catch(err => {
      console.error((err));
    });
  }
}

  navigateToFolderContent(imgClass: string) {
    localStorage.setItem('class', imgClass);
    // this.router.navigate(['/folder-contents']);
    this.openFolder();
  }

  openFolder() {
    this.globals.isContentShowing = this.isContentShowing = true;
    this.globals.isUploading = this.isUploading = false;
    this.globals.isFoldersShowing = this.isFoldersShowing =false;
    this.className = localStorage.getItem('class');
    this.dictionaryItem = this.globals.imageDictionary.dict
    .find(x => x.imgClass === this.className);
  }

  openFolders() {
    this.globals.isContentShowing = this.isContentShowing = false;;
    this.globals.isUploading = this.isUploading = false;
    this.globals.isFoldersShowing = this.isFoldersShowing = true;
  }

  openUpload() {
    this.globals.isContentShowing = this.isContentShowing = false;;
    this.globals.isUploading = this.isUploading = true;
    this.globals.isFoldersShowing = this.isFoldersShowing = false;
    this.globals.imageDictionary = this.classFolders = new Dictionary();
    this.removeAll();
  }
}
