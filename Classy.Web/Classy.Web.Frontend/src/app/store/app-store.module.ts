import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../../environments/environment.prod';
import { reducers, metaReducers } from './reducers';
import { ImageEffects } from './effects/image.effects';
<<<<<<< HEAD
import { UserEffects } from './effects/user.effects';
=======
import { LayoutEffects } from './effects/layout.effects';
>>>>>>> c3d74b25f9f60937c713772ef16556f6ecb19c0d

const modules = [
  CommonModule,
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: environment.production,
  }),
<<<<<<< HEAD
  EffectsModule.forRoot([ImageEffects, UserEffects])
=======
  EffectsModule.forRoot([ImageEffects, LayoutEffects]),
  StoreRouterConnectingModule.forRoot()
>>>>>>> c3d74b25f9f60937c713772ef16556f6ecb19c0d
];

@NgModule({
  declarations: [],
  imports: modules
})
export class AppStoreModule { }
