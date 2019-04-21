import { Component, OnInit } from '@angular/core';
import { Image } from '@classy/store/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { skip, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-folder-test',
  templateUrl: './folder-test.component.html',
  styleUrls: ['./folder-test.component.scss']
})
export class FolderTestComponent implements OnInit {
  images$ = this.store.pipe(select(fromRoot.getImagesState))
  min: number = 0;
  max: number = 25;
  Images: string[] = [];
  class: string = "test";
  constructor(private store: Store<fromRoot.State>) {
    let parent = this;
    this.images$.pipe(skip(this.min), take(25), map<Image[], string[]>(x => x.map(parent.convert))).subscribe(images => this.Images = images);
  }

  ngOnInit() {
  }

  increment() {
    if (this.min < this.Images.length) {
      this.min += 5;
    }
  }

  decrement() {
    if (this.min > 0) {
      this.min -= 5;
    }
  }

  public convert(image: Image) {
    let reader = new FileReader();
    reader.readAsDataURL(image.file);
    console.log("State: " + reader.readyState);
    return reader.result.toString();
  }
}
