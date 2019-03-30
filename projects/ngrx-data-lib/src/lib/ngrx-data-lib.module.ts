import { NgModule, OnDestroy, ModuleWithProviders, Injector } from '@angular/core';
import { NgrxDataConfiguration } from './models/configuration';
import { StoreModule } from '@ngrx/store';
import { reducer, initialState } from './state/state';
import { EffectsModule } from '@ngrx/effects'
import { NgrxDataEffects } from './state/effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    
  ],
  providers: [
         
  ],
  imports: [
    EffectsModule.forRoot([NgrxDataEffects]),   
    HttpClientModule,
    StoreModule.forFeature('entityDb', reducer),    
  ],
  exports: [    
    
  ]
})
export class NgrxDataLibModule {  

   static Reducer = reducer;
   static injector: Injector = null;
   
   static forRoot(config: NgrxDataConfiguration): ModuleWithProviders {    

     return {
      ngModule: NgrxDataLibModule,

      providers: [
        {provide: 'ngrxdataConfig', useValue: config}
      ]
     }
   }

   constructor(injector: Injector)
   {
      NgrxDataLibModule.injector = injector;      
   }

 }
