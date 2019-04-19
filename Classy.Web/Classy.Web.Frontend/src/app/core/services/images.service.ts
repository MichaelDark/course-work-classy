import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassificationStorageService } from './classification-storage.service';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private API_PATH = environment.API_PATH;

  constructor(
    private http: HttpClient,
    private classificationStorageService: ClassificationStorageService,
    private store: Store<fromRoot.State>
  ) { }

  user$ = this.store.pipe(select(fromRoot.getUserState));

  classifySingle(file: File) {
    let formData = new FormData();
    formData.append('images', file, file.name);

    this.user$.subscribe(user => {
      this.http
      .post(`${this.API_PATH}/classify-single/${user.id}`, formData)
      .subscribe(response => {
        console.log(response);
        const classificationResult = this.classificationStorageService.parseClassificationResult(response);
        const { fileName, className } = classificationResult;
        this.classificationStorageService.updateClassification({ fileName, className });
      });
    })
  }
}
