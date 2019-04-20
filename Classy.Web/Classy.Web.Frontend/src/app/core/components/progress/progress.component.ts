import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Progress } from '@classy/store/models';
import { LayoutActions } from '@classy/store/actions';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  progress$ = this.store.pipe(select(fromRoot.getProgressState));
  progress: Progress;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.progress$.subscribe(progress => {
      console.log(progress);
      this.progress = progress;
    });
  }

  updateProgress() {
    this.store.dispatch(LayoutActions.updateProgress({ progress: { ...this.progress, current: this.progress.current + 1 } }));
  }

}
