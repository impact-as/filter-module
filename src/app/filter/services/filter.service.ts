import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Params } from '@angular/router/src/shared';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFilterState } from '../models/filter-state.interface';
import { FilterApiService } from './filter-api.service';

@Injectable()
export class FilterService<T> implements OnInit {

  private bs: BehaviorSubject<IFilterState<T>>

  constructor(
    private http: HttpClient,
    private filterApiService: FilterApiService  
  ) {
    this.bs = new BehaviorSubject({} as any);        
   }

  ngOnInit(): void {
  }

  public asObservable(params: Params, url: string): Observable<IFilterState<T>> {
    return this.bs.asObservable();
  }

  public fromRoute(params: Params, url: string): Observable<IFilterState<T>> {
    this.getFilter(params, url)
        .subscribe(data => {
          console.log(data);
          this.bs.next(data);          
        });

    return this.bs.asObservable();
  }

  public getFilter(params: Params, url: string)   {
    const {apiUrl, httpParams} = this.filterApiService.getFilterApiParams(params, url);
    return this.http.get<IFilterState<T>>(apiUrl, {params: httpParams});
  }



  public toRoute<T>(key: string, value: string) {
    //TODO: update route -> push to observables
  }
}