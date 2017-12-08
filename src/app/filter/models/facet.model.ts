export type Facet 
    = MultiCheckFacet 
    | SearchFacet 
    | PaginationFacet 
    | SortFacet 
    | TwoSidedSliderFacet 
    | OneSidedSliderFacet;

/* MULTI CHECK */

export interface MultiCheckFacet {
    kind: "multi-check";
    key: string;
    name: string;    
    results: MultiCheckFacetResult[];
}

export interface MultiCheckFacetResult {
    key: string;    
    isActive: boolean;
    count: number;    
    name: string;
}

/* SEARCH */

export interface SearchFacet {
    kind: "search";
    key: string;
    isActive: boolean;
    value: string;    
}

/* PAGINATION */

export interface PaginationFacet {
    kind: "pagination";
    key: string;
    isActive: boolean;
    pageSize: number;
    pageIndex: number;
    hasNextPage: boolean;
}

/* SORT */

export interface SortFacet {
    kind: "sort";
    key: string;
    results: SortFacetResult[];
}

export interface SortFacetResult {
    key: string;    
    isActive: boolean;
    name: string;
}

/* TWO SIDED SLIDER */

export interface TwoSidedSliderFacet {
    kind: "two-sided-slider";
    key: string;
    isActive: boolean;
    name: string;
    min: number;
    max: number;
    currentMin: number;
    currentMax: number;
}

/* ONE SIDED SLIDER */

export interface OneSidedSliderFacet {
    kind: "one-sided-slider";
    key: string;
    isActive: boolean;
    name: string;
    min: number;
    max: number;
    value: number;
}