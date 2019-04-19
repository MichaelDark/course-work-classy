import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassificationStorageService } from '@classy/core/services/classification-storage.service';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  API_PATH = environment.API_PATH;

  constructor(
    private http: HttpClient,
    private classificationStorageService: ClassificationStorageService,
    private store: Store<fromRoot.State>
  ) { }

  user$ = this.store.pipe(select(fromRoot.getUserState));

  ngOnInit() {
    console.log(this.classificationStorageService.data);
  }

  exportToMyComputer() {
    console.log(`Exporting to My Computer...`);

    const data = this.classificationStorageService.data;
    this.user$.subscribe(user => {
      this.http.post(`${this.API_PATH}/export/${user.id}`, JSON.parse(data), { responseType: 'blob' })
        .subscribe(res => {
          console.log(res);
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(res);
          link.download = "classified_images.zip";
          link.click();
        });
    });
  }

  exportToGoogleDrive() {
    console.log(`Exporting to Google Drive...`);
  }

  exportToDropbox() {
    console.log(`Exporting to Dropbox...`);
  }
}
