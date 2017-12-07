import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FacetSelectorComponent } from './components/facet-selector.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FacetSelectorComponent
  ],
  exports: [
    FacetSelectorComponent
  ]
})
export class SharedModule { }
