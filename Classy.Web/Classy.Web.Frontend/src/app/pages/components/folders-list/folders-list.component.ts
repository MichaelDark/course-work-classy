import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Image, FileClass } from '@classy/store/models';
import { LayoutActions } from '@classy/store/actions';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent{

  ImageClasses: string[] = [];

  images$ = this.store.pipe(select(fromRoot.getImagesState));
  images: Image[];

  constructor(
    private store: Store<fromRoot.State>
  ) {

    this.defineClasses();
  }

  ngOnInit() {
    this.images$.subscribe(images => this.images = images);
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

  setFolderClass(className: string) {
    this.store.dispatch(LayoutActions
      .setCurrentFolderClass({ currentFolder: className }));
    }


  }



