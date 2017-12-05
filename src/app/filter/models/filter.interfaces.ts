import { HttpParams } from "@angular/common/http/src/params";

export type FilterKey = "product" | "person";

export interface IFilterApi {
    key: FilterKey,
    url: string;
}

export interface IFilterState<T> {
    filter: IFilter;
    entities: T[];
}

export interface IFilter {
    AvailableSortOrders: ISortOrder[];
    Facets: IFacet[];
    HasNextPage: boolean;
    PageIndex?: number;
    PageSize: number;
    SearchTerm?: string;
    SelectedSortOrder?: ISortOrder;
    TotalDocumentsFound: number;
}

export interface ISortOrder {
    Key: string;
    Name: string;
}

export interface IFacet {
    Control: string; // TODO: should be typed!
    Key: string;
    Name: string;
    FacetResults: IFacetResult[];
}

export interface IFacetResult {
    Count: number;
    IsSelected: boolean;
    Query: IQuery;
}

export interface IQuery {
    Name: string;
    Value: string;
    EscapedValue: string;
}