import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from "rxjs/Observable";

import { IFilterState } from '../models/filter-state.interface';
import { FilterService } from '../services/filter.service';

@Component({
    selector: 'filter-component',
    template: `
        <h2>This is the filter component</h2>
    `
})
export class FilterpageComponent<T> implements OnInit {
    public data: Observable<IFilterState<T>>

    constructor(
        public route: ActivatedRoute,
        public filterService: FilterService<T>
    ) {
        console.log("constructor was called!");
    }

    ngOnInit() {
        console.log("ngOnInit was called!");        
        this.route.data.subscribe(data => {
            this.data = data["category"];
        });
    }

}
