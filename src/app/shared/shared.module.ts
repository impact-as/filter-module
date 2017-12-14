import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MultiCheckBoxFacetComponent } from './components/multi-check-box-facet.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    MultiCheckBoxFacetComponent
  ],
  exports: [
    MultiCheckBoxFacetComponent
  ]
})
export class SharedModule { }
