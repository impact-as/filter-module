import { Injectable } from '@angular/core';

import { IFilterApi } from '../models/filter.interfaces';
@Injectable()
export class FilterApiService {
  constructor() { }

  //TODO: should map from a route url to a api url
  public getFilterApi(routeUrl: string): IFilterApi {
    return {} as IFilterApi;
  }
}