import { environment } from '../../environments/environment.prod';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ImageEffects } from './effects/image.effects';
import { UserEffects } from './effects/user.effects';

const modules = [
  CommonModule,
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production,
  }),
  EffectsModule.forRoot([ImageEffects, UserEffects])
];

@NgModule({
  declarations: [],
  imports: modules
})
export class AppStoreModule { }
