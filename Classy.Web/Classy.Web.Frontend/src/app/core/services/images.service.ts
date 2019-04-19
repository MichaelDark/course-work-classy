import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private API_PATH = environment.API_PATH;

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
