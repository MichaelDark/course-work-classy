import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { CoreModule } from '@classy/core/core.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FileDropModule } from 'ngx-file-drop';

import { HomeComponent } from './components/home/home.component';
import { FoldersListComponent } from './components/folders-list/folders-list.component';
import { FolderContentsComponent } from './components/folder-contents/folder-contents.component';
import { AboutComponent } from './components/about/about.component';
import { ExportComponent } from './components/export/export.component';
import { FolderTestComponent } from './components/folder-test/folder-test.component';

@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    //CoreModule,
    PagesRoutingModule,
  ],
  declarations: [
    AboutComponent,
    ExportComponent,
    FolderContentsComponent,
    FoldersListComponent,
    HomeComponent,
    FolderTestComponent
  ],
  exports: [
    AboutComponent,
    ExportComponent,
    FolderContentsComponent,
    FoldersListComponent,
    HomeComponent,
    FolderTestComponent

  ]
})
export class PagesModule { }
