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
        let [fileName, className] = this.parseClassificationResult(res);
        this.updateClassification(fileName, className);
      });
  }

  private updateClassification(fileName: string, className: string): void {
    let classification = JSON.parse(localStorage.getItem('classification'));
    classification[fileName] = className;
    localStorage.setItem('classification', JSON.stringify(classification));
  }

  private parseClassificationResult(res: any): string[] {
    let fileName = Object.keys(res)[0];
    let className = res[fileName];

    return [fileName, className];
  }
}
