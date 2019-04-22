import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Image, FileClass } from '@classy/store/models';
import { LayoutActions } from '@classy/store/actions';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent{

  ImageClasses: string[] = [];

  images$ = this.store.pipe(select(fromRoot.getImagesState));
  imagesByClasses: any;

  constructor(
    private store: Store<fromRoot.State>
  ) {   
  }

  ngOnInit() {
    this.images$.pipe(
      map(this.groupByClass)
    ).subscribe(images => {
    this.imagesByClasses = images;
    let v = this.imagesByClasses.keys(0);
    this.ImageClasses = Array.from(images.keys());
    //let a = this.convertToBase64(this.imagesByClasses.get(this.ImageClasses[0])[0].file);
    let a = this.imagesByClasses.get(this.ImageClasses[0]);
console.log(a[0]);
    });
  }

  private groupByClass(images: Image[]): Map<string, Array<Image>> {
    let [result, classes] = [new Map<string, Array<Image>>(), []];
    new Set(images.map(i => i.class)).forEach(className => classes.push(className));

    for (let cname of classes) {
      let imagesWithClass = [];
      for (let i of images) {
        if (i.class == cname) {
          imagesWithClass.push(i);
        }      
      }
      result.set(cname, imagesWithClass);
    }
    return result;
  };  

  setFolderClass(className: string) {
    this.store.dispatch(LayoutActions
      .setCurrentFolderClass({ currentFolder: className }));     
  }

  public convertToBase64(image: File) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    return reader;
  }
}
