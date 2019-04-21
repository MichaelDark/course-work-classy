import { Component, OnInit } from '@angular/core';
import { Image } from '@classy/store/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-folder-test',
  templateUrl: './folder-test.component.html',
  styleUrls: ['./folder-test.component.scss']
})
export class FolderTestComponent implements OnInit {
  images$ = this.store.pipe(select(fromRoot.getImagesState))
  min: number = 0;
  max: number = 25;
  Images: Image[] = [];
  class: string = "test";
  constructor(private store: Store<fromRoot.State>) { 
    this.images$.pipe(skip(this.min), take(25)).subscribe(images => this.Images = images);
  }

  ngOnInit() {
  }

  increment(){
    if (this.min < this.Images.length){
      this.min +=5;
    }
  }

  decrement(){
    if (this.min >0){
      this.min -=5;
    }
  }

  public convert(image: Image){
    let reader = new FileReader();
    reader.readAsDataURL(image.file);
    return reader.result.toString();
  }
}
