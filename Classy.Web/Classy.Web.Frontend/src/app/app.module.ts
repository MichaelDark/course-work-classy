import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { FileDropModule } from 'ngx-file-drop';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FolderContentsPageComponent } from './components/folder-contents-page/folder-contents-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { ExportPageComponent } from './components/export-page/export-page.component';
import { FoldersListPageComponent } from './components/folders-list-page/folders-list-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { HeaderComponent } from './components/header/header.component';
import { Globals } from './globals';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

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
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
