import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '@classy/store/actions';
import * as fromRoot from '@classy/store/reducers';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';

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

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(UserActions.requestId);
  }

}
