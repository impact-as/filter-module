import { Facet } from "./facet.model";

export type FilterKey = "product" | "person";

export interface IFilterConfig {
    key: FilterKey,
    url: string;
}

export interface IFilter<T> {
    facets: Facet[];
    entities: T[];
    totalEntityCount: number;
}
