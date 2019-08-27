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
   readonly type: string;
   constructor( public providerUid: string, public uniqueName: string ){ this.type = `${ActionTypes.MakeRequest}: ${uniqueName}` }
}

export class RequestSuccess implements Action
{
   readonly type: string;
   constructor( public providerUid: string, public data: any, public uniqueName: string ){ this.type = `${ActionTypes.RequestSuccess}: ${uniqueName}` }
}

export class RequestError implements Action
{
   readonly type: string;
   constructor( public errors: string[], public uniqueName: string ){ this.type = `${ActionTypes.RequestError}: ${uniqueName}` }
}

export class SuccessMapping implements Action
{
   readonly type: string;
   constructor(public uniqueName: string){ this.type = `${ActionTypes.SuccessMapping}: ${uniqueName}` }
}

export class EndRequest implements Action
{
   readonly type: string;
   constructor(public uniqueName: string){ this.type = `${ActionTypes.EndRequest}: ${uniqueName}` }
}

export type RequestActions = 
MakeRequest |
RequestSuccess |
RequestError |
SuccessMapping |
EndRequest