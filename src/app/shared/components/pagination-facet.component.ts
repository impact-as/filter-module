import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { FilterService } from "../../filter/services/filter.service";
import { PaginationFacet } from "../../filter/models/facet.model";

@Component({
  selector: "pagination-facet",
  template: `
        <div *ngIf="facet">
            <label for="pageSize">Page Size</label>
            <input id="pageSize" min="0" #input type="number" (change)="onPageSizeChange(input.value)" [value]="facet.pageSize"/>
            <button type="button" (click)="onBack()" [disabled]="facet.pageIndex === 0">Back</button>
            <button type="button" (click)="onForward()" [disabled]="!facet.hasNextPage">Forward</button>
        </div>
    `
})
export class PaginationFacetComponent<T> implements OnInit {
  @Input() facet: PaginationFacet;

  constructor(private filterService: FilterService<T>) {}

  ngOnInit() {}

  public onBack() {
    this.filterService.updateFilter(
      Object.assign({}, this.facet, {
        pageIndex: this.facet.pageIndex - 1
      })
    );
  }

  public onForward() {
    this.filterService.updateFilter(
      Object.assign({}, this.facet, {
        pageIndex: this.facet.pageIndex + 1
      })
    );
  }

  public onPageSizeChange(value: number) {
    this.filterService.updateFilter(
      Object.assign({}, this.facet, {
        pageSize: value
      })
    );
  }
}
