import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassificationStorageService } from './classification-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private API_PATH = environment.API_PATH;

  constructor(
    private http: HttpClient
  ) { }

  classifySingle(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('images', file, file.name);

    return this.http.post(`${this.API_PATH}/classify-single`, formData);
  }

}
