import { UserActions } from '@classy/store/actions';
import { Component } from '@angular/core';
import * as fromRoot from '@classy/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  template: `
    <div class="container py-5">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    console.log('app ng init start');
    this.store.dispatch(UserActions.requestId);
    console.log('app ng init end');
  }

}
