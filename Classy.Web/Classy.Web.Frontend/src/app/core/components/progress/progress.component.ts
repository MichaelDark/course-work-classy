import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  layout$ = this.store.pipe(select(fromRoot.getLayoutState));
  showProgressBar: boolean;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.layout$.subscribe(layout => {
      this.showProgressBar = layout.showProgressBar;
    });
  }

}
