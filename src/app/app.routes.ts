import { ModuleWithProviders, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { FilterResolver } from './filter/filter.resolve';
import { FilterpageComponent } from './filter/components/filter-page.component';

import { DefaultComponent } from './default.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: "filter/:id",
    component: FilterpageComponent,
    resolve: {
      data: FilterResolver
    }
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);