import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FilterpageComponent } from './components/filter-page.component';
import { FilterResolver } from './filter.resolve';
import { FilterService } from './services/filter.service';
import { FilterApiService } from './services/filter-api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FilterpageComponent
  ],
  providers: [
    FilterResolver,
    FilterService,
    FilterApiService
  ]
})
export class FilterModule { }
