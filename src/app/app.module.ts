import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgrxDataLibModule, JsonFormatConverter, entityArrayMapper } from 'ngrx-data-lib';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { reducer, jsonFormatConverterFactory } from 'projects/ngrx-data-lib/src/public_api';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer),
    NgrxDataLibModule.forRoot({
      deafaultRequestFormat: jsonFormatConverterFactory,
      deafaultResponseFormats: [jsonFormatConverterFactory],
      dataMapper: entityArrayMapper
    }),
    RouterModule.forRoot([
        { path: 'users/:users', component: UserComponent }  
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states     
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
