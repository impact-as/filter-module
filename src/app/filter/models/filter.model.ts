import { Facet } from "./facet.model";

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
    Facets: Facet[];
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

