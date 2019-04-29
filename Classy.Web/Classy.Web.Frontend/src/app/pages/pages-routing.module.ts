import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FoldersListComponent } from './components/folders-list/folders-list.component';
import { FolderContentsComponent } from './components/folder-contents/folder-contents.component';
import { ExportComponent } from './components/export/export.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: FoldersListComponent },
  { path: 'results/:class', component: FolderContentsComponent },
  { path: 'export', component: ExportComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
