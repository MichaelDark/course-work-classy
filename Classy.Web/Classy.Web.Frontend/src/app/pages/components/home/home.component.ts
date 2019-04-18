import { Component } from '@angular/core';
import { UploadFile } from 'ngx-file-drop';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { FileActions } from '@classy/store/actions';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  files$ = this.store.pipe(select(fromRoot.getFilesState));

  constructor(private store: Store<fromRoot.State>) { }

  saveFiles(event: any) {
    from<UploadFile>(event).forEach(file => {
      this.store.dispatch(FileActions.save({ file }));
    });
  }

}
