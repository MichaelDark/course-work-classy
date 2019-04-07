import { FileInputComponent } from './file-input/file-input.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileDropModule } from 'ngx-file-drop';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FolderPageComponent } from './folder-page/folder-page.component';
import { HomePageComponent } from './home-page/home-page.component'
import { ExportPageComponent } from './export-page/export-page.component';
import { FoldersListPageComponent } from './folders-list-page/folders-list-page.component';
import { AboutPageComponent } from './about-page/about-page.component'

@NgModule({
  declarations: [
    AppComponent,
    FileInputComponent,
    HomePageComponent,
    FolderPageComponent,
    ExportPageComponent,
    FoldersListPageComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FileDropModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
