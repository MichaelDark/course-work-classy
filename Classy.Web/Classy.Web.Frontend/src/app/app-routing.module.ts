import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes as f } from './pages/pages-routing.module';

const routes: Routes = [
  { path: '', children: f/* '@classy/pages/pages.module#PagesModule' */ }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
