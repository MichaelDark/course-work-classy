import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './components/file-input/file-input.component';
import { HeaderComponent } from './components/header/header.component';
import { FileDropModule } from 'ngx-file-drop';

const COMPONENTS = [
  FileInputComponent,
  HeaderComponent
];

@NgModule({
  imports: [CommonModule, FileDropModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule { }
