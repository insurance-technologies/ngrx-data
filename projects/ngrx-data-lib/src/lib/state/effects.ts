import { Injectable } from '@angular/core';
import { DataService } from '../services/entity-data.service';
import * as RequestActions from './request-actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { NgrxDataConfigurationService } from '../services/configuaration.service';
import { of } from 'rxjs';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class NgrxDataEffects
{    
    constructor(private actions$: Actions, private dataService: DataService, private configService: NgrxDataConfigurationService, private store: Store<any>){
      
    }

    @Effect()
    requestSuccess = this.actions$.pipe(ofType(RequestActions.ActionTypes.RequestSuccess),
    withLatestFrom(this.store),
    mergeMap(([action, state])=>{

      let requestSuccessAction = action as RequestActions.RequestSuccess;

      let data = requestSuccessAction.data;      
      let uniqueName = requestSuccessAction.uniqueName;

      //get the provider from the service
      let provider = this.configService.getRequestProvider(requestSuccessAction.providerUid);
      //delete the provider from the service very important
      this.configService.deleteRequestProvider(requestSuccessAction.providerUid);

      let method = provider.requestType;

      let dataMapper = provider.dataMapper;

      try
      {
         let crudActions = dataMapper(data, uniqueName, method, state.entityDb);

         let result : Action[] = crudActions;
         result.push(new RequestActions.SuccessMapping(uniqueName));

         return <Action[]>crudActions;
      }
      catch(error)
      {
         return <Action[]>[new RequestActions.RequestError([error], uniqueName)];
      }

    }));

    @Effect()
    makeRequest$ = this.actions$.pipe(ofType(RequestActions.ActionTypes.MakeRequest), 
    mergeMap((action)=>{

       let makeRequestAction = action as RequestActions.MakeRequest;

       let providerUid = makeRequestAction.providerUid;
       let uniqueName = makeRequestAction.uniqueName;

       //get the provider from the service
       let provider = this.configService.getRequestProvider(providerUid);

       //make the http request with the provider
       return this.dataService.makeRequest(makeRequestAction.baseUrl, provider)

       .pipe(mergeMap(response=>{

         return <Action[]>[new RequestActions.RequestSuccess(providerUid, response, uniqueName)];

       }), catchError(err=>{

         //delete the provider from the service very important
         this.configService.deleteRequestProvider(providerUid);
         return of(new RequestActions.RequestError([err], uniqueName));

       }));
       

    }))

}