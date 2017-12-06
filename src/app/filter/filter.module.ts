import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FacetSelectorComponent } from './components/facet-selector.component';

import { FilterService } from './services/filter.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FacetSelectorComponent
  ],
  providers: [
    FilterService
  ],
  exports: [
    FacetSelectorComponent
  ]
})
export class FilterModule { }
