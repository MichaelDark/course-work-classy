import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCounter from '../../reducers';
import { CounterActions } from '../../actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  counter$ = this.store.pipe(select(fromCounter.getCounterState));

  constructor(private store: Store<fromCounter.State>) { }

  increment() { 
    this.store.dispatch(new CounterActions.increment({ diff: 1 }));
  }

  decrement() { 
    this.store.dispatch(new CounterActions.decrement({ diff: 1 }));
  }

}
