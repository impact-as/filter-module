import { Component, OnInit } from '@angular/core';

import { FilterService } from '../../filter/services/filter.service';
import { IFilterResult } from '../../filter/models/filter.model';
import { Facet } from '../../filter/models/facet.model';

import { IPerson } from '../models/person.model';

@Component({
    selector: 'person-page',
    template: `
        <h1>Person page</h1>
        {{personNames | json}}        
        <div class="filter__facets">
            <div class="filter__facet-container" *ngFor="let facet of facets; trackBy: trackByKey">
                <multi-check-facet [facet]="facet"></multi-check-facet>
            </div>
        </div>
    `
})
export class PersonPageComponent implements OnInit {
    public facets: Facet[];
    public personNames: string[];

    constructor(
        public filterService: FilterService<IPerson>
    ) {
    }

    ngOnInit() {
        this.filterService.getFilterResults().subscribe(data => {
            this.facets = data.facets;
            this.personNames = data.entities.map(p => p.Name);
        });
    }
}
