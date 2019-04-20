import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  progress$ = this.store.pipe(select(fromRoot.getProgressState));

  header: string | null;
  text: string | null;
  current: number | null;
  max: number | null;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.progress$.subscribe(progress => {
      console.log(progress);
      
      this.header = progress.header;
      this.text = progress.text;
      this.current = progress.current;
      this.max = progress.max;
    });
  }

}
