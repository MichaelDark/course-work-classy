import { Component } from '@angular/core';
import { UploadFile } from 'ngx-file-drop';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { FileActions } from '../../actions';
import { from } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  files$ = this.store.pipe(select(fromRoot.getFilesState));

  constructor(private store: Store<fromRoot.State>) { }

  saveFiles(event: any) {
    from<UploadFile>(event).forEach(file => {
      this.store.dispatch(FileActions.save({ file }));
    });
  }

}
