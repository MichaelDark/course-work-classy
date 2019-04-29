import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FileDropModule } from 'ngx-file-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './components/home/home.component';
import { FoldersListComponent } from './components/folders-list/folders-list.component';
import { FolderContentsComponent } from './components/folder-contents/folder-contents.component';
import { AboutComponent } from './components/about/about.component';
import { ExportComponent } from './components/export/export.component';
import { FolderTestComponent } from './components/folder-test/folder-test.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  AboutComponent,
  ExportComponent,
  FolderContentsComponent,
  FoldersListComponent,
  HomeComponent,
  FolderTestComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileDropModule,
    PagesRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PagesModule { }
