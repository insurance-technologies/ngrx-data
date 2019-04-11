import { Action } from '@ngrx/store';
import { RequestProvider } from '../http/request-provider';
import { HttpMethod } from '../http/http-method';

export enum ActionTypes
{
    MakeRequest = '[Request] MakeRequest',
    RequestSuccess = '[Request] RequestSuccess',
    RequestError = '[Request] RequestError',
    SuccessMapping = '[Request] SuccessMapping',
    EndRequest = '[Request] EndRequest',
}


export class MakeRequest implements Action
{
   readonly type = ActionTypes.MakeRequest;   
   constructor( public providerUid: string, public baseUrl: string, public uniqueName: string ){}
}

export class RequestSuccess implements Action
{
   readonly type = ActionTypes.RequestSuccess;   
   constructor( public providerUid: string, public data: any, public uniqueName: string ){}
}

export class RequestError implements Action
{
   readonly type = ActionTypes.RequestError;   
   constructor( public errors: string[], public uniqueName: string ){}
}

export class SuccessMapping implements Action
{
   readonly type = ActionTypes.SuccessMapping;   
   constructor(public uniqueName: string){}
}

export class EndRequest implements Action
{
   readonly type = ActionTypes.EndRequest;   
   constructor(public uniqueName: string){}
}

export type RequestActions = 
MakeRequest |
RequestSuccess |
RequestError |
SuccessMapping |
EndRequest