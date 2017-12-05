import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/product/032eb319-4a6e-49cf-88b7-549b6bd27a10_da">Product</a>
      <a routerLink="/person/032eb319-4a6e-49cf-88b7-549b6bd27a10_da">Person</a>
    </nav>      
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'app';
}
