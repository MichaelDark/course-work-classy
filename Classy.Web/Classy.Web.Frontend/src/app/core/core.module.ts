import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FileDropModule } from 'ngx-file-drop';

const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  imports: [CommonModule, FileDropModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule { }
