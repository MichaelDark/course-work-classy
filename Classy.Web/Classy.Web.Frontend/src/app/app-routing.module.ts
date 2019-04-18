import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@classy/pages/components/home/home.component';
import { FoldersListComponent } from '@classy/pages/components/folders-list/folders-list.component';
import { FolderContentsComponent } from '@classy/pages/components/folder-contents/folder-contents.component';
import { ExportComponent } from '@classy/pages/components/export/export.component';
import { AboutComponent } from '@classy/pages/components/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'folders-list', component: FoldersListComponent },
  { path: 'folder-contents', component: FolderContentsComponent },
  { path: 'export', component: ExportComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
