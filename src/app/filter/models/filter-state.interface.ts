import {IFilter} from './filter.interface';

export interface IFilterState<T> {
    key: string;
    filter: IFilter;
    entities: T[];
}