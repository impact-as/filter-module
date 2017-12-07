import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router/src/shared';
import { Router, Route, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { filterConfigs } from '../configs/filter.config';

import { IFilterConfig, IFilterResult, IFilterState, IFacet, IFacetResult } from '../models/filter.model';
import { HttpParams } from '@angular/common/http/src/params';

@Injectable()
export class FilterService<T> {

  private bs: BehaviorSubject<IFilterResult<T>>

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.bs = new BehaviorSubject(this.getEmptyFilterResult());

    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot)
      ).subscribe((snapshot: ActivatedRouteSnapshot) => {
        const config = this.getFilterConfig(snapshot.routeConfig, filterConfigs);
        this.pushParamsToFilterState(config.url, this.asHttpParams(snapshot.queryParams));
      });      
  }

  public getFilterResults(): Observable<IFilterResult<T>> {
    return this.bs.asObservable();
  }

  public updateMultiCheckFacet(key: string, item: IFacetResult, isChecked: boolean): void {
    const newFacets = this.bs.value.filterState.Facets
                          .map(facet => this.getFacetWithResultChecked(facet, key, item, isChecked));

    const newFacetParams = newFacets.map(facet => this.getFacetParams(facet))
                                    .reduce((target, source) => Object.assign(target, source), {});
                                       
    this.router.navigate([], {queryParams: newFacetParams});
  }

  private getFacetWithResultChecked(facet: IFacet, key: string, item: IFacetResult, isChecked: boolean) {
    if (facet.Key !== key) {
      return facet;
    }

    facet.FacetResults = facet.FacetResults.map(result => {
      if (result.Query.Name === item.Query.Name) {
        result.IsSelected = isChecked;
      }

      return result;
    });

    return facet;
  }

  private getFacetParams(facet: IFacet): Params {
    return facet.FacetResults
              .filter(result => result.IsSelected)
              .map(result => {
                return {
                  key: facet.Key,
                  value: facet.FacetResults.filter(result => result.IsSelected)
                                                .map(result => result.Query.Value)
                                                .join(',')
                }
              }).reduce((target, kv) => {
                const source = {};
                source[kv.key] = kv.value
                return Object.assign(target, source);
              }, {});
  }  

  private pushParamsToFilterState(url: string, params: HttpParams): void {
    this.http.get(url, {params: params})
        .subscribe(data => {
          this.bs.next(this.toFilterResult(data));
        });
  }

  private toFilterResult(data: any): IFilterResult<T> {
    return {
      entities: data.Products,
      filterState: {
        AvailableSortOrders: data.AvailableSortOrders,
        Facets: data.Facets,
        HasNextPage: data.HasNextPage,
        PageSize: data.PageSize,
        TotalDocumentsFound: data.TotalDocumentsFound
      }
    };
  }

  //TODO: fix!!
  private asHttpParams(params: Params): HttpParams {
    return params as HttpParams;
  }

  //TODO: fix!!
  private getFilterConfig(route: Route, filterConfigs: IFilterConfig[]): IFilterConfig {
    return filterConfigs[0];
  }

  private getEmptyFilterResult(): IFilterResult<T> {
    return {
      filterState: {
        AvailableSortOrders: [],
        Facets: [],
        HasNextPage: false,
        PageSize: 0,
        TotalDocumentsFound: 0        
      }, 
      entities: []
    };    
  }
}