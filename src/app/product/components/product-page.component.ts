import { Component, OnInit } from "@angular/core";

import { FilterService } from "../../filter/services/filter.service";
import { IFilter } from "../../filter/models/filter.model";
import {
  Facet,
  MultiCheckBoxFacet,
  PaginationFacet
} from "../../filter/models/facet.model";

import { IProduct } from "../models/product.model";

@Component({
  selector: "product-page",
  template: `
        <h1>Product page</h1>
        <h2>Pagination</h2>
        <pagination-facet [facet]="paginationFacet"></pagination-facet>    
        <pre>{{productNames | json}}</pre>
        <div class="filter__facets">
            <div class="filter__facet-container" *ngFor="let facet of multiCheckBoxFacets; trackBy: trackByKey">
                <multi-check-box-facet [facet]="facet"></multi-check-box-facet>
            </div>
        </div>
    `
})
export class ProductPageComponent implements OnInit {
  public multiCheckBoxFacets: MultiCheckBoxFacet[];
  public paginationFacet: PaginationFacet;

  public productNames: string[];

  constructor(private filterService: FilterService<IProduct>) {}

  ngOnInit() {
    this.filterService.getFilter().subscribe(data => {
      this.multiCheckBoxFacets = data.facets.filter(
        facet => facet.kind === "multi-check-box"
      ) as MultiCheckBoxFacet[];

      this.paginationFacet = data.facets.find(
        facet => facet.kind === "pagination"
      ) as PaginationFacet;

      this.productNames = data.entities.map(p => p.Name);
    });
  }
}
