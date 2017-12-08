import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MultiCheckFacetComponent } from './components/multi-check-facet.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    MultiCheckFacetComponent
  ],
  exports: [
    MultiCheckFacetComponent
  ]
})
export class SharedModule { }
