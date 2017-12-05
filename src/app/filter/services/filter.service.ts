import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Params } from '@angular/router/src/shared';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { first, map, skip } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FilterApiService } from './filter-api.service';
import { IFilterApi, IFilterState, IFacetResult, IFilter, IFacet } from '../models/filter.interfaces';
import { HttpParams } from '@angular/common/http/src/params';

@Injectable()
export class FilterService<T> {

  private bs: BehaviorSubject<IFilterState<T>>

  constructor(
    private filterApiService: FilterApiService,
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bs = new BehaviorSubject(this.getEmptyFilterState());

    this.route.queryParams
      .subscribe(params => {
        const api = this.filterApiService.getFilterApi(location.path());
        this.pushParamsToFilterState(api.url, this.asHttpParams(params));
      });        
  }

  public getFilter(): Observable<IFilterState<T>> {
    return this.bs.asObservable();
  }

  public updateMulticheckFacet(key: string, item: IFacetResult, isChecked: boolean) {
    const newFacets = this.bs.value.filter.Facets
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
          this.bs.next(this.toFilterStateModel(data));
        });
  }

  private toFilterStateModel(data: any): IFilterState<T> {
    return {
      entities: data.Products,
      filter: {
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

  private getEmptyFilterState(): IFilterState<T> {
    return {
      filter: {
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