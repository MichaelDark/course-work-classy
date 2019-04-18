import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FolderContentsPageComponent } from './pages/folder-contents-page/folder-contents-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FileInputComponent } from './core/components/file-input/file-input.component';
import { ExportPageComponent } from './pages/export-page/export-page.component';
import { FoldersListPageComponent } from './pages/folders-list-page/folders-list-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HeaderComponent } from './core/components/header/header.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    EffectsModule.forRoot([AppEffects]),
    AppStoreModule,
    CoreModule,
    PagesModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
