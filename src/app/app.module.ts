import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgrxDataLibModule, JsonFormatConverter, entityArrayMapper } from 'ngrx-data-lib';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(NgrxDataLibModule.Reducer),
    NgrxDataLibModule.forRoot({
      deafaultRequestFormat: new JsonFormatConverter(),
      deafaultResponseFormats: [new JsonFormatConverter()],
      dataMapper: entityArrayMapper      
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states     
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
