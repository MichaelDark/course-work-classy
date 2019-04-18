import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from '@classy/store/app-store.module';
import { CoreModule } from '@classy/core/core.module';
import { PagesModule } from '@classy/pages/pages.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    AppStoreModule,
    CoreModule,
    PagesModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
