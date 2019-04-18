import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropModule } from 'ngx-file-drop';

import { HeaderComponent } from './components/header/header.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

const COMPONENTS = [
  HeaderComponent,
  ProgressBarComponent
];

@NgModule({
  imports: [CommonModule, FileDropModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule { }
