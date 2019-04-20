import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Progress } from '@classy/store/models';
import { LayoutActions } from '@classy/store/actions';
import { tap, switchMap, concatMap } from 'rxjs/operators';
import { faCoffee, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { delay } from 'q';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  faCoffee = faCoffee;
  faCheckCircle = faCheckCircle;

  progress$ = this.store.pipe(select(fromRoot.getProgressState));
  progress: Progress;
  show: boolean = false;
  complete: boolean = false;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.progress$.pipe(
      tap(progress => {
        this.show = progress != null;

        this.progress = progress;
        this.complete = progress !== null && progress.current == progress.max;
        //this.show = (progress !== null);
        
        if (progress !== null && progress.current == progress.max) {
          //this.show = false;
          this.store.dispatch(LayoutActions.endProgress());
        }
      }),
    ).subscribe(() => {});
  }

}
