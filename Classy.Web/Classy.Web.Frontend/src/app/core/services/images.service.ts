
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Observable, of } from 'rxjs';
import { ClassyDataObject, FileClass, User } from '@classy/store/models';
import { LayoutActions } from '@classy/store/actions';
//import { ClassificationStorageService } from './classification-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private API_PATH = environment.API_PATH;

  user$ = this.store.pipe(select(fromRoot.getUserState));
  user: User;
  
  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    //private classificationStorageService: ClassificationStorageService
  ) {
    this.user$.subscribe(user => this.user = user);
  }

  // classifyAndSave(file: File) {
  //   return this.classifySingle(file).pipe(
  //     tap(response => {
  //       this.parseResponseAndSave(response);
  //     })
  //   );
  // }

  // parseResponseAndSave(response: ClassyDataObject): FileClass {
  //   console.log(response);

  //   const fileClass = this.classificationStorageService.parseClassificationResult(response);
  //   this.classificationStorageService.updateClassification(fileClass);
  
  //   return fileClass;
  // }
  
  classifySingle(file: File): Observable<ClassyDataObject> {
    const formData = this.makeFormData(file);
    return this.http.post<ClassyDataObject>(`${this.API_PATH}/classify-single/${this.user.id}`, formData);
  }

  private makeFormData(file: File): FormData {
    let result = new FormData();
    result.append('images', file, file.name);
    return result;
  }

}
