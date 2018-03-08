import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { MultiCheckBoxFacetComponent } from "./components/multi-check-box-facet.component";
import { PaginationFacetComponent } from "./components/pagination-facet.component";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [MultiCheckBoxFacetComponent, PaginationFacetComponent],
  exports: [MultiCheckBoxFacetComponent, PaginationFacetComponent]
})
export class SharedModule {}
