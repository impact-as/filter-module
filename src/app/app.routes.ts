import { ModuleWithProviders, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ProductPageComponent } from './product/components/product-page.component';
import { PersonPageComponent } from './person/components/person-page.component';

import { DefaultComponent } from './default.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: 'product/:id',
    component: ProductPageComponent
  },
  {
    path: 'person/:id',
    component: PersonPageComponent
  }  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);