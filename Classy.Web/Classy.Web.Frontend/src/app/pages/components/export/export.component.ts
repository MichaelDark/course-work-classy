import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

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
