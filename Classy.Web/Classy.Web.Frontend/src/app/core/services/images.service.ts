import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassificationStorageService } from './classification-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private API_PATH = environment.API_PATH;

  constructor(
    private http: HttpClient,
    private classificationStorageService: ClassificationStorageService 
  ) {
    console.log('classy service');
    console.log(this.classificationStorageService);
  }

  classifySingle(file: File) {
    let formData = new FormData();
    formData.append('images', file, file.name);

    this.http
      .post(`${this.API_PATH}/classify-single`, formData)
      .subscribe(res => {
        console.log(res);
        const result = this.classificationStorageService.parseClassificationResult(res);
        const { fileName, className } = result;
        this.classificationStorageService.updateClassification({ fileName, className });
      });
  }

}
