import { Component } from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Component({
  selector: 'app-root',
  template: `
    <div class="container py-5">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
    <app-progress></app-progress>
  `
})
export class AppComponent {

  layout$ = this.store.pipe(select(fromRoot.getLayoutState));

  constructor(private store: Store<fromRoot.State>) { }

}
