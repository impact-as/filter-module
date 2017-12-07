import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FilterModule } from '../filter/filter.module';
import { SharedModule } from '../shared/shared.module';

import { ProductPageComponent } from './components/product-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FilterModule,
    SharedModule
  ],
  declarations: [
    ProductPageComponent
  ],
  providers: [
  ]
})
export class ProductModule { }
