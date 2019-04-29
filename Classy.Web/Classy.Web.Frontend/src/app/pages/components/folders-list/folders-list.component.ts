import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '@classy/store/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent {

  imageClasses: string[] = [];

  images$ = this.store.pipe(select(fromRoot.getImagesState));
  imagesGroupedByClasses: Map<string, Array<Image>>;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.images$.pipe(
      map(this.groupByClass)
    ).subscribe(images => {
      this.imagesGroupedByClasses = images;
      this.imageClasses = Array.from(images.keys());
    });
  }

  navigateToFolder(className: string) {
    this.router.navigateByUrl(`/results/${className}`);
  }

  private groupByClass(images: Image[]): Map<string, Array<Image>> {
    const [result, classes] = [new Map<string, Array<Image>>(), []];
    new Set(images.map(i => i.class)).forEach(className => classes.push(className));

    for (const cname of classes) {
      const imagesWithClass = [];
      for (const i of images) {
        if (i.class === cname) {
          imagesWithClass.push(i);
        }
      }
      result.set(cname, imagesWithClass);
    }
    return result;
  }

}
