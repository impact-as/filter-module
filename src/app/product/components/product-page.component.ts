import { Component, OnInit } from '@angular/core';

import { FilterService } from '../../filter/services/filter.service';
import { IFilterResult, IFacet } from '../../filter/models/filter.interfaces';

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
    public facets: IFacet[];
    public productNames: string[];

    constructor(
        private filterService: FilterService<IProduct>
    ) {
    }

    ngOnInit() {
        this.filterService.getFilterResults().subscribe(data => {
            this.facets = data.filterState.Facets;
            this.productNames = data.entities.map(p => p.Name);
        });
    }
}
