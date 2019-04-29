import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.css']
})
export class FolderContentsComponent {

  class: string;

  images$ = this.store.pipe(select(fromRoot.getImagesState));

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.class = params.get("class");
    });
  }

}
