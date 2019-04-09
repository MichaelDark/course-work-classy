import { Component, Input } from '@angular/core';

export enum ExportOption {
  MyComputer = "MyComputer",
  GoogleDrive = "GoogleDrive",
  Dropbox = "Dropbox"
}

@Component({
  selector: 'app-export-page',
  templateUrl: './export-page.component.html',
  styleUrls: ['./export-page.component.css']
})
export class ExportPageComponent {

  @Input() selectedExportOption: ExportOption;
  // local field = enum
  ExportOption = ExportOption;

  exportTo(val: ExportOption) {
    this.selectedExportOption = val;
    console.log(`Export set to ${this.selectedExportOption}`);
  }

}
