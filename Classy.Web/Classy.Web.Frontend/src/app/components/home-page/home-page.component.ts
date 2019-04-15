import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCounter from '../../reducers';
import { CounterActions } from '../../actions';
import { UploadFile } from 'ngx-file-drop';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  // counter$ = this.store.pipe(select(fromCounter.getCounterState));
  // constructor(private store: Store<fromCounter.State>) { }
  // increment = () => this.store.dispatch(CounterActions.increment({ diff: 1 }));
  // decrement = () => this.store.dispatch(CounterActions.decrement({ diff: 1 }));

  saveFiles(event: any) {
    console.log(event);
  }

}
