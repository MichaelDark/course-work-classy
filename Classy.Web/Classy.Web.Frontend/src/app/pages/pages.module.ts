import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';
import { PagesRoutingModule } from './pages-routing.module';

import { HomeComponent } from './components/home/home.component';
import { FoldersListComponent } from './components/folders-list/folders-list.component';
import { FolderContentsComponent } from './components/folder-contents/folder-contents.component';
import { AboutComponent } from './components/about/about.component';
import { ExportComponent } from './components/export/export.component';
import { FileDropModule } from 'ngx-file-drop';

const COMPONENTS = [
  AboutComponent,
  ExportComponent,
  FolderContentsComponent,
  FoldersListComponent,
  HomeComponent
]

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule,
    FileDropModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PagesModule { }
