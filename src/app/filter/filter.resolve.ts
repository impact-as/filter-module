import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { FilterService } from "./services/filter.service";
import { IFilterState } from './models/filter-state.interface';

@Injectable()
export class FilterResolver<T> implements Resolve<IFilterState<T>> {
    constructor(
        private filterService: FilterService<T>
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFilterState<T>> {
        return this.filterService.fromRoute(route.params, state.url);
    }
}