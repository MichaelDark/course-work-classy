import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  API_PATH = 'https://localhost:44311/api'

  constructor(
    private http: HttpClient
  ) { }

  classifySingle(file: File) {
    let formData = new FormData();
    formData.append('images', file, file.name);
    
    this.http
      .post(`${this.API_PATH}/classify-single`, formData)
      .subscribe(res => {
        console.log(res)
      });
  }

}
