import { Action } from '@ngrx/store';

export enum ActionTypes
{
    //actions that affect the database
    CreateEntityState = '[DataEntitiesDB] CreateEntityState',
    DeleteEntityState = '[DataEntitiesDB] DeleteEntityState',
    DeleteAllEntityStates = '[DataEntitiesDB] DeleteAllEntityStates',
    
    //actions that affect only specific entity
    AddEntityToState = '[DataEntitiesDB] AddEntityToState',
    AddMany = '[DataEntitiesDB] AddMany',
    DeleteEntityFromState = '[DataEntitiesDB] DeleteEntityFromState',
    DeleteAll = '[DataEntitiesDB] DeleteAll',
    DeleteMany = '[DataEntitiesDB] DeleteMany',
    Update = '[DataEntitiesDB] Update',
    UpdateMany = '[DataEntitiesDB] UpdateMany',    
    SelectEntity = '[DataEntitiesDB] SelectEntity',
}

//actions that affect the database
export class CreateEntityState implements Action
{
   readonly type: string;
   constructor( public uniqueName: string ){ this.type = `${ActionTypes.CreateEntityState}: ${uniqueName}` }
}

export class DeleteEntityState implements Action
{   
   readonly type: string;
   constructor( public uniqueName: string ){ this.type = `${ActionTypes.DeleteEntityState}: ${uniqueName}` }
}

export class DeleteAllEntityStates implements Action
{
    readonly type = ActionTypes.DeleteAllEntityStates;   
    constructor(){} 
}


//actions that affect only specific entity
export class AddEntityToState implements Action
{
   readonly type: string;
   constructor( public entity: any, public uniqueName: string ){ this.type = `${ActionTypes.AddEntityToState}: ${uniqueName}` }
}


export class AddMany implements Action
{
   readonly type: string;
   constructor( public entities: any[], public uniqueName: string ){ this.type = `${ActionTypes.AddMany}: ${uniqueName}` }
}


export class DeleteEntityFromState implements Action
{
   readonly type: string;
   constructor( public id: string, public uniqueName: string ){ this.type = `${ActionTypes.DeleteEntityFromState}: ${uniqueName}` }
}


export class DeleteAll implements Action
{
   readonly type: string;
   constructor( public uniqueName: string ){}
}


export class DeleteMany implements Action
{
   readonly type: string;
   constructor( public ids: string[], public uniqueName: string ){ this.type = `${ActionTypes.DeleteMany}: ${uniqueName}` }
}


export class Update implements Action
{
   readonly type: string;
   constructor( public entity: any, public uniqueName: string ){ this.type = `${ActionTypes.Update}: ${uniqueName}` }
}


export class UpdateMany implements Action
{
   readonly type: string;
   constructor( public entities: any[], public uniqueName: string ){ this.type = `${ActionTypes.UpdateMany}: ${uniqueName}` }
}

export class SelectEntity implements Action
{
   readonly type: string;
   constructor( public id: string | number, public uniqueName: string ){ this.type = `${ActionTypes.SelectEntity}: ${uniqueName}` }
}

export type DBActions = 
//actions that affect the database
CreateEntityState |
DeleteEntityState |
DeleteAllEntityStates |

//actions that affect only specific entity
AddEntityToState | 
AddMany |
DeleteEntityFromState |
DeleteAll |
DeleteMany |
Update |
UpdateMany |
SelectEntity
;