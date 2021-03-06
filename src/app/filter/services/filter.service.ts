import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http/src/params";

import { Params } from "@angular/router/src/shared";
import {
  Router,
  Route,
  ActivationEnd,
  ActivatedRouteSnapshot
} from "@angular/router";

import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { filterConfigs } from "../configs/filter.config";

import {
  assignToValueProperty,
  assignToArrayProperty,
  assignToRangeProperty
} from "../functions/param.function";

import { IFilterConfig, IFilter } from "../models/filter.model";
import {
  Facet,
  MultiCheckBoxFacet,
  SearchFacet,
  SortFacet,
  TwoSidedSliderFacet,
  PaginationFacet
} from "../models/facet.model";

@Injectable()
export class FilterService<T> {
  private bs: BehaviorSubject<IFilter<T>>;

  constructor(private http: HttpClient, private router: Router) {
    this.bs = new BehaviorSubject(this.getEmptyFilter());

    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot)
      )
      .subscribe((snapshot: ActivatedRouteSnapshot) => {
        const config = this.getFilterConfig(
          snapshot.routeConfig,
          filterConfigs
        );
        this.pushParamsToFilterState(
          config.url,
          this.asHttpParams(snapshot.queryParams)
        );
      });
  }

  public getFilter(): Observable<IFilter<T>> {
    return this.bs.asObservable();
  }

  public updateFilter(newFacet: Facet): void {
    const queryParams = this.bs.value.facets
      .map(facet => (newFacet.key === facet.key ? newFacet : facet))
      .map(facet => this.getFacetParams(facet))
      .reduce((target, source) => Object.assign(target, source), {});

    this.router.navigate([], { queryParams });
  }

  private getFacetParams(facet: Facet): Params {
    switch (facet.kind) {
      case "multi-check-box":
        return this.getMultiCheckBoxFacetParams(facet);
      case "search":
        return this.getSearchFacetParams(facet);
      case "sort":
        return this.getSortFacetParams(facet);
      case "two-sided-slider":
        return this.getTwoSidedFacetParams(facet);
      case "pagination":
        return this.getPaginationFacetParams(facet);
      default:
        return {};
    }
  }

  private;

  private getMultiCheckBoxFacetParams(facet: MultiCheckBoxFacet): Params {
    return facet.children
      .map(child => {
        return {
          key: facet.key,
          value: child.key,
          isActive: child.isActive
        };
      })
      .reduce<Params>(assignToArrayProperty, {});
  }

  private getSearchFacetParams(facet: SearchFacet): Params {
    return assignToValueProperty({}, facet);
  }

  private getSortFacetParams(facet: SortFacet): Params {
    return facet.children
      .map(child => {
        return {
          key: facet.key,
          value: child.key,
          isActive: child.isActive
        };
      })
      .reduce<Params>(assignToValueProperty, {});
  }

  private getTwoSidedFacetParams(facet: TwoSidedSliderFacet): Params {
    return assignToRangeProperty(
      {},
      {
        key: facet.key,
        from: facet.min,
        to: facet.max,
        isActive: facet.isActive
      }
    );
  }

  private getPaginationFacetParams(facet: PaginationFacet): Params {
    const pageIndexParam =
      facet.pageIndex === 0
        ? {}
        : assignToValueProperty(
            {},
            {
              isActive: facet.isActive,
              key: "pageIndex",
              value: facet.pageIndex.toString()
            }
          );

    return assignToValueProperty(pageIndexParam, {
      isActive: facet.isActive,
      key: "pageSize",
      value: facet.pageSize.toString()
    });
  }

  private pushParamsToFilterState(url: string, params: HttpParams): void {
    this.http.get(url, { params: params }).subscribe(data => {
      this.bs.next(this.toFilterModel(data));
    });
  }

  private toFilterModel(data: any): IFilter<T> {
    data.Facets = data.Facets.map(facet => {
      facet.FacetResults = facet.FacetResults.map(result => {
        result.IsSelected =
          result.IsSelected !== undefined ? result.IsSelected : false;
        return result;
      });
      return facet;
    }).map(facet => {
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
          };
        })
      };
    });

    // Pagination
    data.Facets.push({
      kind: "pagination",
      key: "pagination",
      isActive: true,
      pageSize: data.PageSize,
      pageIndex: data.PageIndex || 0,
      // data.HasNextPage from BE doesn't work
      hasNextPage:
        data.PageSize * ((data.PageIndex || 0) + 1) < data.TotalDocumentsFound
    });

    return {
      entities: data.Products,
      facets: data.Facets,
      totalEntityCount: data.TotalDocumentsFound
    };
  }

  // TODO: fix!!
  private asHttpParams(params: Params): HttpParams {
    return params as HttpParams;
  }

  // TODO: fix!!
  private getFilterConfig(
    route: Route,
    configs: IFilterConfig[]
  ): IFilterConfig {
    return configs[0];
  }

  private getEmptyFilter(): IFilter<T> {
    return {
      facets: [],
      entities: [],
      totalEntityCount: 0
    };
  }
}
