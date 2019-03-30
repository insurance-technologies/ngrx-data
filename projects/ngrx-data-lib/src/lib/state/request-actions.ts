import { Action } from '@ngrx/store';
import { RequestProvider } from '../http/request-provider';

export enum ActionTypes
{
    MakeRequest = '[Request] MakeRequest',
    RequestSuccess = '[Request] RequestSuccess',
    RequestError = '[Request] RequestError'
}


export class MakeRequest implements Action
{
   readonly type = ActionTypes.MakeRequest;   
   constructor( public providerUid: string, public baseUrl: string ){}
}

export class RequestSuccess implements Action
{
   readonly type = ActionTypes.RequestSuccess;   
   constructor( public data: any ){}
}


export class RequestError implements Action
{
   readonly type = ActionTypes.RequestError;   
   constructor( public errors: string[] ){}
}