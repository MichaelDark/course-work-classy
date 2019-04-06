import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  files: File[] = [];
  title = 'front';

  handleFileInput(files: FileList) {
    this.files.splice(0, this.files.length);
    for (let file in files){
      this.files.push(files[file]);
      alert(this.files[file]);
    }
}
}
