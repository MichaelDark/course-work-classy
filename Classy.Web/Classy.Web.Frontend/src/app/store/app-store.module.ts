import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { reducers, metaReducers } from './reducers';
import { effects } from './effects';

const MODULES = [
  CommonModule,
  StoreModule.forRoot(reducers, { metaReducers }),
  EffectsModule.forRoot(effects),
  StoreRouterConnectingModule.forRoot()
];

@NgModule({
  imports: MODULES
})
export class AppStoreModule { }
