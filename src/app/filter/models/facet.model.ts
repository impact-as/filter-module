export type Facet 
    = MultiCheckBoxFacet 
    | SearchFacet 
    | PaginationFacet 
    | SortFacet 
    | TwoSidedSliderFacet;

/* MULTI CHECK BOX */

export interface MultiCheckBoxFacet {
    kind: "multi-check-box";
    key: string;
    name: string;    
    children: MultiCheckBoxFacetChild[];
}

export interface MultiCheckBoxFacetChild {
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
    children: SortFacetChild[];
}

export interface SortFacetChild {
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