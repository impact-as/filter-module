import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from "rxjs/Observable";

import { FilterService } from '../../filter/services/filter.service';
import { IFilterState } from '../../filter/models/filter.model';
import { MultiCheckFacet, MultiCheckFacetResult } from '../../filter/models/facet.model';

@Component({
    selector: 'facet-selector',
    template: `
        <div class="filter__facet-group">
            <div>
                <h2 class="filter__facet-group-headline">{{ facet.Name }}</h2>
                <div class="filter__facet-item-container" *ngFor="let item of facet.results">                
                    <label for="{{facet.EscapedKey}}{{item.name}}">
                        <input id="{{facet.EscapedKey}}{{item.name}}" 
                               #input
                               class="filter__facet-checkbox" 
                               type="checkbox" 
                               [checked]="item.isActive" 
                               [disabled]="!item.count"
                               (change)="onItemChange(item, input.checked)" />
                        <div class="filter__facet-item" [ngClass]="{ 'filter__facet-item_selected' : item.isActive }" >
                            <span class="filter__checkbox-name">{{item.name}}</span> 
                            <span class="filter__checkbox-count">({{item.count || 0}})</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    `
})
export class FacetSelectorComponent<T> implements OnInit {
    @Input() facet: MultiCheckFacet;

    constructor(
        private filterService: FilterService<T>
    ) {
    }

    ngOnInit() {
    }

    public onItemChange(item: MultiCheckFacetResult, isChecked: boolean): void {
        const newResults = this.facet.results.map(result => {
            if (result.key !== item.key) {
                return result;
            }

            result.isActive = isChecked;
            return result;
        })

        this.filterService.updateFacet(Object.assign(this.facet, {results: newResults}));
    }
}
