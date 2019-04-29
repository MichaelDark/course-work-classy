import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Progress } from '@classy/store/models';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  faCheckCircle = faCheckCircle;

  @Input()
  progress: Progress;

  @Input()
  show: boolean;

  @Input()
  complete: boolean;

  //progress$ = this.store.pipe(select(fromRoot.getProgressState));
  //progress: Progress;
  //show: boolean = false;
  //complete: boolean = false;

  constructor(
    //private store: Store<fromRoot.State>
  ) {
    // this.progress$.subscribe(progress => {
    //   //console.log('NEW PROGRESS STATE');
    //   this.show = progress !== null;
    //   this.progress = progress;
    //   this.complete = progress !== null && progress.current == progress.max;
    // });
  }

}
