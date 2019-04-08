import { FileInputComponent } from './file-input/file-input.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileDropModule } from 'ngx-file-drop';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FolderContentsPageComponent } from './folder-contents-page/folder-contents-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ExportPageComponent } from './export-page/export-page.component';
import { FoldersListPageComponent } from './folders-list-page/folders-list-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HeaderComponent } from './header/header.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
