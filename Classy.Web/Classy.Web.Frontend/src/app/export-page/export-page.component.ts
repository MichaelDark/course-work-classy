import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-export-page',
  templateUrl: './export-page.component.html',
  styleUrls: ['./export-page.component.css']
})
export class ExportPageComponent {

  exportToMyComputer() {
    console.log(`Exporting to My Computer...`);
  }

  exportToGoogleDrive() {
    console.log(`Exporting to Google Drive...`);
  }

  exportToDropbox() {
    console.log(`Exporting to Dropbox...`);
  }

}
