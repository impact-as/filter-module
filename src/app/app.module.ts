import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DefaultComponent } from './default.component';

import { PersonModule } from './person/person.module';
import { ProductModule } from './product/product.module';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    PersonModule,
    ProductModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
