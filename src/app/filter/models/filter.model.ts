export type FilterKey = "product" | "person";

export interface IFilterConfig {
    key: FilterKey,
    url: string;
}

export interface IFilterResult<T> {
    filterState: IFilterState;
    entities: T[];
}

export interface IFilterState {
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
    Control: string; // TODO: should be a type!
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