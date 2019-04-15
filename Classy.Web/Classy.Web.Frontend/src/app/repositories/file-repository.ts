import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileRepository {

  files = new Array<File>();

  add(files: File | File[]) {
    if (files instanceof File) {
      this.files.push(files);
    } else {
      this.files.concat(files);
    }

    console.log(this.files);
  }

}
