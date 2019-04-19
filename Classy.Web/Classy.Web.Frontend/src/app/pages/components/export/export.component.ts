import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  API_PATH = environment.API_PATH;

  ngOnInit() {
    console.log(this.classificationStorageService.data);
  }

  exportToMyComputer() {
    console.log(`Exporting to My Computer...`);
    
    const data = this.classificationStorageService.data;
    this.http.post(`${this.API_PATH}/export`, data, { responseType: 'json' })
      .subscribe(res => {
        console.log(res);
      });
  }

  exportToGoogleDrive() {
    console.log(`Exporting to Google Drive...`);
  }

  exportToDropbox() {
    console.log(`Exporting to Dropbox...`);
  }

  constructor(
    private http: HttpClient,
    private classificationStorageService: ClassificationStorageService
  ) { }

}
