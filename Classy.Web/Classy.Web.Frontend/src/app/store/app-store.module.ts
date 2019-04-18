import { environment } from '../../environments/environment.prod';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { FileEffects } from './effects/file.effects';

const modules = [
  CommonModule,
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production,
  }),
  EffectsModule.forRoot([FileEffects])
];

@NgModule({
  declarations: [],
  imports: modules
})
export class AppStoreModule { }
