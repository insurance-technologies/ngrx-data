import { Injectable } from '@angular/core';
import { DataService } from '../services/entity-data.service';
import * as RequestActions from './request-actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom, switchMap, filter } from 'rxjs/operators';
import { NgrxDataConfigurationService } from '../services/configuaration.service';
import { of, Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Router, ActivatedRoute, ChildActivationEnd, ChildActivationStart, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { SelectEntity } from './db-actions';
import { v1 } from 'uuid';
import { stat } from 'fs';

@Injectable()
export class NgrxDataEffects {
   constructor(
      private actions$: Actions,
      private dataService: DataService,
      private configService: NgrxDataConfigurationService,
      private store: Store<any>,
      private router: Router      
   ) {
   }

   @Effect()
   requestSuccess = this.actions$.pipe(ofDynamicType(RequestActions.ActionTypes.RequestSuccess),
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {

         let requestSuccessAction = action as RequestActions.RequestSuccess;

         let data = requestSuccessAction.data;
         

         //get the provider from the service
         let provider = this.configService.getRequestProvider(requestSuccessAction.providerUid);        
         let uniqueName = provider.uniqueName;

         //delete the provider from the service very important
         this.configService.deleteRequestProvider(requestSuccessAction.providerUid);

         let method = provider.requestType;

         let dataMapper = provider.dataMapper;

         if (!dataMapper){

            if( provider.chainedRequest ){
               let id = v1();
               let requestProvider = provider.chainedRequest( requestSuccessAction.data );
               this.configService.injectRequestProvider( id, requestProvider );
               return [ new RequestActions.MakeRequest(id, requestProvider.uniqueName) ]
            }

         }

         let result: Action[] = [];

         try {
            let crudActions = dataMapper( { data: data, uniqueName: uniqueName, requestType: method, requestBody: provider.body, dbState: state.entityDb });

            crudActions.forEach(a => result.push(a));
            
            result.push(new RequestActions.SuccessMapping(uniqueName));            
         }
         catch (error) {
            return <Action[]>[new RequestActions.RequestError([error], uniqueName)];
         }
         finally{

            if( provider.chainedRequest ){
               let id = v1();
               let requestProvider = provider.chainedRequest( requestSuccessAction.data );
               this.configService.injectRequestProvider( id, requestProvider );
               result.push(new RequestActions.MakeRequest(id, requestProvider.uniqueName));
            }
         }

         return result;

      }));

   @Effect()
   makeRequest$ = this.actions$.pipe(ofDynamicType(RequestActions.ActionTypes.MakeRequest),
      mergeMap((action) => {

         let makeRequestAction = action as RequestActions.MakeRequest;

         let providerUid = makeRequestAction.providerUid;
         
         //get the provider from the service
         let provider = this.configService.getRequestProvider(providerUid);
         let uniqueName = provider.uniqueName;

         //make the http request with the provider
         return this.dataService.makeRequest(provider.baseUrl, provider)

            .pipe(mergeMap(response => {

               return <Action[]>[new RequestActions.RequestSuccess(providerUid, response, makeRequestAction.uniqueName)];

            }), catchError(err => {

               //delete the provider from the service very important
               this.configService.deleteRequestProvider(providerUid);
               return of(new RequestActions.RequestError([err], uniqueName));

            }));


      }))

   @Effect()
   routingEffect$ = this.router.events.pipe(mergeMap(v => {


      if (v instanceof ChildActivationStart) {
         let params = new Map<string, string>();

         this.getParams(params, v.snapshot);
         return this.processParams(params);
      }

      return <Action[]>[];

   }));

   //routing

   getParams(paramsMap: Map<string, string>, snapchot: ActivatedRouteSnapshot) {
      let snapchotParamMap = snapchot.paramMap;
      let keys = snapchotParamMap.keys;

      for (let i = 0; i < keys.length; i++) {
         let key = keys[i];
         paramsMap.set(key, snapchotParamMap.get(key));
      }

      for (let i = 0; i < snapchot.children.length; i++) {
         this.getParams(paramsMap, snapchot.children[i]);
      }
   }

   processParams(params: Map<string, string>): Action[] {
      console.log(params);

      let keys = Array.from(params.keys());
      let routesParamNames = this.configService.routerParamNames;

      let result: SelectEntity[] = [];

      for (let i = 0; i < keys.length; i++) {
         let key = keys[i];
         let uniqueName = routesParamNames.get(key);
         if (uniqueName) {
            let id = params.get(key);
            result.push(new SelectEntity(id, uniqueName));
         }
      }

      return <Action[]>result;

   }

   

}

const ofDynamicType = (type: string) => (sourceObservable: Observable<Action>) => sourceObservable.pipe(filter( a => a.type.startsWith(type) ));