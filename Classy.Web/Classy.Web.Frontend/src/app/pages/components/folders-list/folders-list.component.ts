import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  images$ = this.store.pipe(select(fromRoot.getImagesState));
  classes: string[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.images$.pipe(
      map(images => [ ...new Set(images.map(i => i.class).filter(Boolean)) ]),
    ).subscribe(classes => {
      this.classes = classes;
    });
  }

  setFolderClass(className: string) {
    this.router.navigateByUrl(`/results/${className}`);
  }

}



