import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropModule } from 'ngx-file-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './components/header/header.component';
import { ProgressComponent } from './components/progress/progress.component';

const COMPONENTS = [
  HeaderComponent,
  ProgressComponent
];

@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    FontAwesomeModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule { }
