import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Progress } from '@classy/store/models';
import { tap } from 'rxjs/operators';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  faCheckCircle = faCheckCircle;

  progress$ = this.store.pipe(select(fromRoot.getProgressState));
  progress: Progress;
  show: boolean = false;
  complete: boolean = false;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.progress$.subscribe(progress => {
      this.show = progress != null;
      this.progress = progress;
      this.complete = progress !== null && progress.current == progress.max;
    });
  }

}
