import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Observable } from 'rxjs';
import { ClassificationStorageService } from './classification-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private API_PATH = environment.API_PATH;

  user$ = this.store.pipe(select(fromRoot.getUserState));
  user: any;
  
  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  classifySingle(file: File): Observable<any> {
    const formData = this.makeFormData(file);
    return this.http.post(`${this.API_PATH}/classify-single/${this.user.id}`, formData);
  }

  private makeFormData(file: File): FormData {
    let result = new FormData();
    result.append('images', file, file.name);
    return result;
  }

}
