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

  showProgress: boolean;
  classificationProgressCurrent: number | null;
  classificationProgressMax: number | null;
  fileNameCurrent: string | null;
  percent: number| null;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.layout$.subscribe(layout => {
      this.showProgress = layout.showProgress;
      this.classificationProgressCurrent = layout.classificationProgressCurrent;
      this.classificationProgressMax = layout.classificationProgressMax;
      this.fileNameCurrent = layout.fileNameCurrent;
      this.percent = Math.floor(layout.classificationProgressCurrent / layout.classificationProgressMax * 100)
    });
  }

}
