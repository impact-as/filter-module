import { Injectable } from '@angular/core';

import { IFilterApiParams } from '../models/filer-api-params.interface';
@Injectable()
export class FilterApiService {
  constructor() { }

  public getFilterApiParams(params, routeUrl: string): IFilterApiParams {
    return {
      apiUrl: "api url goes here",
      httpParams: this.httpParams(params)
    };
  }

  private httpParams(params) {
    return params;    
  }
}