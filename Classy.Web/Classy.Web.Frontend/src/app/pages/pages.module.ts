import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FileDropModule } from 'ngx-file-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { FoldersListComponent } from './components/folders-list/folders-list.component';
import { FolderContentsComponent } from './components/folder-contents/folder-contents.component';
import { AboutComponent } from './components/about/about.component';
import { ExportComponent } from './components/export/export.component';

const COMPONENTS = [
  AboutComponent,
  ExportComponent,
  FolderContentsComponent,
  FoldersListComponent,
  HomeComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileDropModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
    PagesRoutingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PagesModule { }
