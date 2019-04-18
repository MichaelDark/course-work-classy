import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FoldersListPageComponent } from './pages/folders-list-page/folders-list-page.component';
import { FolderContentsPageComponent } from './pages/folder-contents-page/folder-contents-page.component';
import { ExportPageComponent } from './pages/export-page/export-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'folders-list', component: FoldersListPageComponent },
  { path: 'folder-contents', component: FolderContentsPageComponent },
  { path: 'export', component: ExportPageComponent },
  { path: 'about', component: AboutPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
