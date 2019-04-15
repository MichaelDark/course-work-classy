import { FileInputComponent } from './components/file-input/file-input.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileDropModule } from 'ngx-file-drop';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FolderContentsPageComponent } from './components/folder-contents-page/folder-contents-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ExportPageComponent } from './components/export-page/export-page.component';
import { FoldersListPageComponent } from './components/folders-list-page/folders-list-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { HeaderComponent } from './components/header/header.component';
import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    FileInputComponent,
    HomePageComponent,
    FolderContentsPageComponent,
    ExportPageComponent,
    FoldersListPageComponent,
    AboutPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FileDropModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
