import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Progress } from '@classy/store/models';
import { LayoutActions } from '@classy/store/actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  progress$ = this.store.pipe(select(fromRoot.getProgressState));
  progress: Progress;
  show: boolean = false;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.progress$.pipe(
      tap(progress => {
        console.log(progress);
      })
    ).subscribe(progress => {
      this.progress = progress;
      this.show = (progress !== null);
      
      if (progress !== null && progress.current == progress.max) {
        this.show = false;
        this.store.dispatch(LayoutActions.endProgress());
      }
    });
  }

}
