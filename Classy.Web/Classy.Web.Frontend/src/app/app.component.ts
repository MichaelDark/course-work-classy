import { Component } from '@angular/core';
<<<<<<< HEAD
import { Store } from '@ngrx/store';
import { UserActions } from '@classy/store/actions';
import * as fromRoot from '@classy/store/reducers';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';
=======
import { State, Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
>>>>>>> c3d74b25f9f60937c713772ef16556f6ecb19c0d

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

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(UserActions.requestId);
  }

}
