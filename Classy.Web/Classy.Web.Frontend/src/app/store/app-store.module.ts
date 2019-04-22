import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../../environments/environment.prod';
import { reducers, metaReducers } from './reducers';
import { ImageEffects } from './effects/image.effects';
import { UserEffects } from './effects/user.effects';
import { LayoutEffects } from './effects/layout.effects';

const MODULES = [
  CommonModule,
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production,
  }),
  EffectsModule.forRoot([ImageEffects, UserEffects, LayoutEffects]),
  StoreRouterConnectingModule.forRoot()
];

@NgModule({
  declarations: [],
  imports: MODULES
})
export class AppStoreModule { }
