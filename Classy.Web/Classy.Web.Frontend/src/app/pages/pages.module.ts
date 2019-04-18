import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';

import { HomePageComponent } from './home-page/home-page.component';
import { FoldersListPageComponent } from './folders-list-page/folders-list-page.component';
import { FolderContentsPageComponent } from './folder-contents-page/folder-contents-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ExportPageComponent } from './export-page/export-page.component';

const COMPONENTS = [
  AboutPageComponent,
  ExportPageComponent,
  FolderContentsPageComponent,
  FoldersListPageComponent,
  HomePageComponent
]

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PagesModule { }
