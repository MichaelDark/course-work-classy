import { Component, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserActions } from '@classy/store/actions';
import * as fromRoot from '@classy/store/reducers';
import { Progress } from '@classy/store/models';

@Component({
  selector: 'app-root',
  template: `
    <div class="container py-5">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
    <app-progress [progress]="progress" [show]="show" [complete]="complete">
    </app-progress>
  `
})
export class AppComponent {

  progress$ = this.store.pipe(select(fromRoot.getProgressState));
  progress: Progress;
  show: boolean = false;
  complete: boolean = false;

  constructor(
    private store: Store<fromRoot.State>,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.store.dispatch(UserActions.requestId);
    this.progress$.subscribe(progress => {
      this.zone.run(() => {
        this.progress = progress;
        this.show = progress !== null;
        this.complete = progress !== null && progress.current === progress.max;
      });
    });
  }

}
