import { NgModule, OnDestroy, ModuleWithProviders } from '@angular/core';
import { NgrxDataLibComponent } from './ngrx-data-lib.component';
import { NgrxDataConfigurationService } from './services/configuaration.service';
import { NgrxDataConfiguration } from './models/configuration';

@NgModule({
  declarations: [
    NgrxDataLibComponent,
    NgrxDataConfigurationService
  ],
  imports: [
  ],
  exports: [
    NgrxDataLibComponent
  ]
})
export class NgrxDataLibModule {
  
   static forRoot(config: NgrxDataConfiguration): ModuleWithProviders {
     
    
     
     return {
      ngModule: NgrxDataLibModule,
      providers: [NgrxDataConfigurationService, {provide: 'ngrxdataConfig', useValue: config}]
     }
   }

 }
