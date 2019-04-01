import { Injectable } from '@angular/core';
import { DataService } from '../services/entity-data.service';
import * as RequestActions from './request-actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { NgrxDataConfigurationService } from '../services/configuaration.service';
import { of } from 'rxjs';

@Injectable()
export class NgrxDataEffects
{    
    constructor(private actions$: Actions, private dataService: DataService, private configService: NgrxDataConfigurationService){
      
    }

    @Effect()
    makeRequest$ = this.actions$.pipe(ofType(RequestActions.ActionTypes.MakeRequest), 
    mergeMap((action)=>{

       let makeRequestAction = action as RequestActions.MakeRequest;

       //get the provider from the service
       let provider = this.configService.getRequestProvider(makeRequestAction.providerUid);

       //delete the provider from the service very important
       this.configService.deleteRequestProvider(makeRequestAction.providerUid);

       //make the http request with the provider
       return this.dataService.makeRequest(makeRequestAction.baseUrl, provider)

       .pipe(mergeMap(response=>{
          let dataMapper = this.configService.configuration.dataMapper;        
          return dataMapper.map(response);
       }), catchError(err=>{
         return of(new RequestActions.RequestError([err], makeRequestAction.uniqueName));
       }));
       

    }))

}