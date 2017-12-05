import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { FilterService } from '../../filter/services/filter.service';
import { IFilterState, IFacet } from '../../filter/models/filter.interfaces';

import { IPerson } from '../models/person.interface';

@Component({
    selector: 'person-page',
    template: `
        <h1>Person page</h1>
        {{personNames | json}}        
        <div class="filter__facets">
            <div class="filter__facet-container" *ngFor="let facet of facets; trackBy: trackByKey">
                <facet-selector [facet]="facet"></facet-selector>
            </div>
        </div>
    `
})
export class PersonPageComponent implements OnInit {
    public data: Observable<IFilterState<IPerson>>
    public facets: IFacet[];
    public personNames: string[];

    constructor(
        public filterService: FilterService<IPerson>
    ) {
    }

    ngOnInit() {
        this.filterService.getFilter().subscribe(data => {
            this.facets = data.filter.Facets;
            this.personNames = data.entities.map(p => p.Name);
        });
    }
}
