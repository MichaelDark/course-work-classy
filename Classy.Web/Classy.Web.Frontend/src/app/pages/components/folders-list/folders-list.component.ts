import { ClassificationStorageService, storageFactory } from '@classy/core/services/classification-storage.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FileClass } from '@classy/store/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent implements OnInit, OnChanges {

  storage: Storage;

  ImageClasses: string[] = [];

  constructor( ) { }

  ngOnInit() {
    //this.storage = localStorage;
    //localStorage.clear();
    this.defineClasses();

  }
  ngOnChanges(changes: SimpleChanges) {
    this.defineClasses();
  }

  defineClasses(): void {
     const imageStrings = localStorage.getItem('classy');
     const imageObjects = JSON.parse(imageStrings);
     console.log(imageObjects);

     for (const key in imageObjects) {
        if (!this.ImageClasses.includes(imageObjects[key])) {
          this.ImageClasses.push(imageObjects[key]);

      }
     }
     console.log(this.ImageClasses);

  }

}


