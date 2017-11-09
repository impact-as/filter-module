export interface IFilter {
    AvailableSortOrders: ISortOrder[];
    Facets: IFacet[];
    HasNextPage: boolean;
    PageIndex: number;
    PageSize: number;
    SearchTerm: string;
    SelectedSortOrder: ISortOrder;
    TotalDocumentsFound: number;
}

export interface ISortOrder {
    Key: string;
    Name: string;
}

export interface IFacet {
    Control: string; // TODO: should be typed!
    IsSelected: boolean;
    Key: string;
    Name: string;
    Results: IFacetResult[];
}

export interface IFacetResult {
    Count: number;
    IsSelected: boolean;
    Key: string;
    Name: string;
}
