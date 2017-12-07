import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { FilterService } from '../../filter/services/filter.service';
import { IFilterState, IFacet } from '../../filter/models/filter.interfaces';

import { IProduct } from '../models/product.interface';

@Component({
    selector: 'product-page',
    template: `
        <h1>Product page</h1>
        {{productNames | json}}        
        <div class="filter__facets">
            <div class="filter__facet-container" *ngFor="let facet of facets; trackBy: trackByKey">
                <facet-selector [facet]="facet"></facet-selector>
            </div>
        </div>
    `
})
export class ProductPageComponent implements OnInit {
    public data: Observable<IFilterState<IProduct>>
    public facets: IFacet[];
    public productNames: string[];

    constructor(
        private filterService: FilterService<IProduct>
    ) {
    }

    ngOnInit() {
        this.filterService.getFilterState().subscribe(data => {
            this.facets = data.filter.Facets;
            this.productNames = data.entities.map(p => p.Name);
        });
    }
}
