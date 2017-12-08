import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http/src/params';

import { Params } from '@angular/router/src/shared';
import { Router, Route, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { filterConfigs } from '../configs/filter.config';

import { IFilterConfig, IFilterResult } from '../models/filter.model';
import { Facet, MultiCheckFacet } from '../models/facet.model';

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

  public updateFacet(newFacet: Facet): void {
    const queryParams = this.bs.value.facets
      .map(facet => newFacet.key === facet.key ? newFacet : facet)
      .map(facet => this.getFacetParams(facet))
      .reduce((target, source) => Object.assign(target, source), {});

    this.router.navigate([], { queryParams });
  }

  private getFacetParams(facet: Facet): Params {
    switch(facet.kind) {
      case "multi-check": 
        return this.getMultiCheckFacetParams(facet);
      case "search":
      case "pagination":
      case "sort":
      case "one-sided-slider": //TODO: needs implementation
      case "two-sided-slider": //TODO: needs implementation
      default:
        return {};      
    }
  }

  private getMultiCheckFacetParams(facet: MultiCheckFacet): Params {
    return facet.results
                .filter(result => result.isActive)
                .reduce((params, facetResult) => {
                  let obj = {};
                  obj[facet.key] = [facetResult.key];
                  
                  if (params[facet.key] instanceof Array) {
                    obj[facet.key].push(...params[facet.key]);
                  }

                  return Object.assign(params, obj);
                }, {});
  }

  private pushParamsToFilterState(url: string, params: HttpParams): void {
    this.http.get(url, {params: params})
        .subscribe(data => {
          this.bs.next(this.toFilterResult(data));
        });
  }

  private toFilterResult(data: any): IFilterResult<T> {
    data.Facets = data.Facets.map(facet => {
      facet.FacetResults = facet.FacetResults.map(result => {
        result.IsSelected = result.IsSelected !==  undefined ? result.IsSelected : false;
        return result;
      });
      return facet;
    });

    return {
      entities: data.Products,
      facets: data.Facets.map(facet => {
        return {
          kind: "multi-check",
          key: facet.Key,
          name: facet.Name,    
          results: facet.FacetResults.map(result => {
            return {
              count: result.Count,  
              isActive: result.IsSelected,
              key: result.Query.Value,
              name: result.Query.Name     
            }
          })
        }
      }),
      totalEntityCount: data.TotalDocumentsFound      
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
      facets: [], 
      entities: [],
      totalEntityCount: 0
    };    
  }
}