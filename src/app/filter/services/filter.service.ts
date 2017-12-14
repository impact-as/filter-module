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

import { IFilterConfig, IFilter } from '../models/filter.model';
import { Facet, MultiCheckBoxFacet } from '../models/facet.model';

@Injectable()
export class FilterService<T> {

  private bs: BehaviorSubject<IFilter<T>>

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.bs = new BehaviorSubject(this.getEmptyFilter());

    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot)
      ).subscribe((snapshot: ActivatedRouteSnapshot) => {
        const config = this.getFilterConfig(snapshot.routeConfig, filterConfigs);
        this.pushParamsToFilterState(config.url, this.asHttpParams(snapshot.queryParams));
      });      
  }

  public getFilter(): Observable<IFilter<T>> {
    return this.bs.asObservable();
  }

  public updateFilter(newFacet: Facet): void {
    const queryParams = this.bs.value.facets
      .map(facet => newFacet.key === facet.key ? newFacet : facet)
      .map(facet => this.getFacetParams(facet))
      .reduce((target, source) => Object.assign(target, source), {});

    this.router.navigate([], { queryParams });
  }

  private getFacetParams(facet: Facet): Params {
    switch(facet.kind) {
      case "multi-check-box":         
        return this.getMultiCheckBoxFacetParams(facet);
      case "search":
      case "pagination":
      case "sort":
      case "one-sided-slider":
      case "two-sided-slider":
      default:
        return {};      
    }
  }

  private getMultiCheckBoxFacetParams(facet: MultiCheckBoxFacet): Params {
    return facet.children
                .filter(child => child.isActive)
                .reduce((params, child) => {
                  let obj = {};
                  obj[facet.key] = [child.key];
                  
                  if (params[facet.key] instanceof Array) {
                    obj[facet.key].push(...params[facet.key]);
                  }

                  return Object.assign(params, obj);
                }, {});
  }

  private pushParamsToFilterState(url: string, params: HttpParams): void {
    this.http.get(url, {params: params})
        .subscribe(data => {
          this.bs.next(this.toFilterModel(data));
        });
  }

  private toFilterModel(data: any): IFilter<T> {
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
          kind: "multi-check-box",
          key: facet.Key,
          name: facet.Name,    
          children: facet.FacetResults.map(result => {
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

  private getEmptyFilter(): IFilter<T> {
    return {
      facets: [], 
      entities: [],
      totalEntityCount: 0
    };    
  }
}