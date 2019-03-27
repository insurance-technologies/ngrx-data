import { Action } from '@ngrx/store';

export enum DataEntitiesStateActionTypes
{
    CreateNew = '[DataEntities] CreateNew',
}


export class CreateNewAction implements Action
{
   type = DataEntitiesStateActionTypes.CreateNew;
   
   constructor( public name: string, public entityType: new () => any ){
    
   }
}

export type DataEntitiesStateActions = CreateNewAction