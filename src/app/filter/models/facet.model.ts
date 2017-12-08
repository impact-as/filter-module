export type Facet = MultiCheckFacet | TwoSidedSliderFacet | OneSidedSliderFacet;

/* MULTI CHECK */

export interface MultiCheckFacet {
    kind: "multi-check";
    key: string;
    name: string;    
    results: MultiCheckFacetResult[];
}

export interface MultiCheckFacetResult {
    count: number;    
    isActive: boolean;
    key: string;    
    name: string;
}

/* TWO SIDED SLIDER */

export interface TwoSidedSliderFacet {
    kind: "two-sided-slider";
    isActive: boolean;
    key: string;
    name: string;
    min: number;
    max: number;
    currentMin: number;
    currentMax: number;
}

/* ONE SIDED SLIDER */

export interface OneSidedSliderFacet {
    kind: "one-sided-slider";
    isActive: boolean;
    key: string;
    name: string;
    min: number;
    max: number;
    value: number;
}