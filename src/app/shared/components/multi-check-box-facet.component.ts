import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { FilterService } from "../../filter/services/filter.service";
import {
  MultiCheckBoxFacet,
  MultiCheckBoxFacetChild
} from "../../filter/models/facet.model";

@Component({
  selector: "multi-check-box-facet",
  template: `
        <div class="filter__facet-group">
            <div>
                <h2 class="filter__facet-group-headline">{{ facet.name }}</h2>
                <div class="filter__facet-item-container" *ngFor="let item of facet.children">                
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
export class MultiCheckBoxFacetComponent<T> implements OnInit {
  @Input() facet: MultiCheckBoxFacet;

  constructor(private filterService: FilterService<T>) {}

  ngOnInit() {}

  public onItemChange(item: MultiCheckBoxFacetChild, isChecked: boolean): void {
    const newChildren = this.facet.children.map(child => {
      const newIsActive = child.key === item.key ? isChecked : child.isActive;

      return Object.assign(child, { isActive: newIsActive });
    });

    this.filterService.updateFilter(
      Object.assign({}, this.facet, { children: newChildren })
    );
  }
}
