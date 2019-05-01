import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UploadEvent } from 'ngx-file-drop';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { ImageActions, LayoutActions } from '@classy/store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images$ = this.store.pipe(select(fromRoot.getImagesState));

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }
  
  anyFiles() {
    return this.images$.pipe()
  }

  onFileDrop(event: UploadEvent) {
    let [current, max] = [0, event.files.length];
    let progress = {
      header: 'Classification',
      text: event.files[0].fileEntry.name,
      textComplete: 'Complete',
      current: current,
      max: max
    };
    
    this.store.dispatch(LayoutActions.showProgress({ progress }));
    this.store.dispatch(ImageActions.classifyAll({ uploadFiles: event.files }));
    this.router.navigateByUrl('/results');
  }

}
