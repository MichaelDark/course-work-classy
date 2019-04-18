import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container py-5">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
