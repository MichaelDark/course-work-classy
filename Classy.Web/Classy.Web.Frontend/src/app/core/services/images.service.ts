import { LayoutActions } from '@classy/store/actions';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Observable, of } from 'rxjs';
import { ClassyResponse, FileClass } from '@classy/store/models/image.model';
import { ClassificationStorageService } from './classification-storage.service';
import { map, tap } from 'rxjs/operators';
import { store } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private API_PATH = environment.API_PATH;

  user$ = this.store.pipe(select(fromRoot.getUserState));
  user: any;
  
  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private classificationStorageService: ClassificationStorageService
  ) {
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  classifyAndSave(file: File): Observable<ClassyResponse> {
    return this.classifySingle(file).pipe(
      tap(response => {
        this.parseResponseAndSave(response);
      })
    );
  }

  parseResponseAndSave(response: ClassyResponse): Observable<FileClass> {
    console.log(response);

    const fileClass = this.classificationStorageService.parseClassificationResult(response);
    this.classificationStorageService.updateClassification(fileClass);

    return of(fileClass);
  }

  classifySingle(file: File): Observable<ClassyResponse> {
    const formData = this.makeFormData(file);
    return this.http.post<ClassyResponse>(`${this.API_PATH}/classify-single/${this.user.id}`, formData);
  }

  private makeFormData(file: File): FormData {
    let result = new FormData();
    result.append('images', file, file.name);
    return result;
  }

}
