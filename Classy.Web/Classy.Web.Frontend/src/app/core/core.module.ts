import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropModule } from 'ngx-file-drop';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { HeaderComponent } from './components/header/header.component';
import { ProgressComponent } from './components/progress/progress.component';

const COMPONENTS = [
  HeaderComponent,
  ProgressComponent
];

@NgModule({
  imports: [CommonModule, FileDropModule, NgCircleProgressModule.forRoot()],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule { }
