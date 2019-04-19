import { NgModule } from '@angular/core';
import { PagesModule } from '@classy/pages/pages.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: '@classy/pages/pages.module#PagesModule'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
