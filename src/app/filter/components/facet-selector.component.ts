import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from "rxjs/Observable";

import { FilterService } from '../services/filter.service';

import { IFilterState, IFacetResult, IFacet } from '../models/filter.interfaces';

@Component({
    selector: 'facet-selector',
    template: `
        <div class="filter__facet-group">
            <div>
                <h2 class="filter__facet-group-headline">{{ facet.Name }}</h2>
                <div class="filter__facet-item-container" >                
                    <label for="{{facet.EscapedKey}}{{item.Query.Name}}" *ngFor="let item of facet.FacetResults">
                        <input id="{{facet.EscapedKey}}{{item.Query.Name}}" 
                               #input
                               class="filter__facet-checkbox" 
                               type="checkbox" 
                               [checked]="item.IsSelected" 
                               [disabled]="!item.Count"
                               (change)="onItemChange(input.checked, item)" />
                        <div class="filter__facet-item" [ngClass]="{ 'filter__facet-item_selected' : item.IsSelected }" >
                            <span class="filter__checkbox-name">{{item.Query.Name}}</span> 
                            <span class="filter__checkbox-count">({{item.Count || 0}})</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    `
})
export class FacetSelectorComponent<T> implements OnInit {
    @Input() facet: IFacet;

    constructor(
        private filterService: FilterService<T>
    ) {
    }

    ngOnInit() {
    }

    public onItemChange(isChecked: boolean, item: IFacetResult): void {
        this.filterService.updateMulticheckFacet(this.facet.Key, item, isChecked);
    }
}
