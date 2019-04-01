import { Injectable } from '@angular/core';
import { DataService } from '../services/entity-data.service';
import * as RequestActions from './request-actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { NgrxDataConfigurationService } from '../services/configuaration.service';

@Injectable()
export class NgrxDataEffects
{    
    constructor(private actions$: Actions, private dataService: DataService, private configService: NgrxDataConfigurationService){
      
    }

    @Effect()
    makeRequest$ = this.actions$.pipe(ofType(RequestActions.ActionTypes.MakeRequest), 
    mergeMap((action)=>{
       let makeRequestAction = action as RequestActions.MakeRequest;

       let provider = this.configService.getRequestProvider(makeRequestAction.providerUid);

       return this.dataService.makeRequest(makeRequestAction.baseUrl,provider)
       .pipe(mergeMap(response=>{
          let dataMapper = this.configService.configuration.dataMapper;          
          return dataMapper.map(response);
       }))
    }))

}