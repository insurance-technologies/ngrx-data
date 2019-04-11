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
   readonly type = ActionTypes.CreateEntityState;   
   constructor( public uniqueName: string ){}
}

export class DeleteEntityState implements Action
{
   readonly type = ActionTypes.DeleteEntityState;   
   constructor( public uniqueName: string ){}
}

export class DeleteAllEntityStates implements Action
{
   readonly type = ActionTypes.DeleteAllEntityStates;   
    constructor(){} 
}


//actions that affect only specific entity
export class AddEntityToState implements Action
{
   readonly type = ActionTypes.AddEntityToState;   
   constructor( public entity: any, public uniqueName: string ){}
}


export class AddMany implements Action
{
   readonly type = ActionTypes.AddMany;   
   constructor( public entities: any[], public uniqueName: string ){}
}


export class DeleteEntityFromState implements Action
{
   readonly type = ActionTypes.DeleteEntityFromState;   
   constructor( public id: string, public uniqueName: string ){}
}


export class DeleteAll implements Action
{
   readonly type = ActionTypes.DeleteAll;   
   constructor( public uniqueName: string ){}
}


export class DeleteMany implements Action
{
   readonly type = ActionTypes.DeleteMany;   
   constructor( public ids: string[], public uniqueName: string ){}
}


export class Update implements Action
{
   readonly type = ActionTypes.Update;   
   constructor( public entity: any, public uniqueName: string ){}
}


export class UpdateMany implements Action
{
   readonly type = ActionTypes.UpdateMany;   
   constructor( public entities: any[], public uniqueName: string ){}
}

export class SelectEntity implements Action
{
   readonly type = ActionTypes.SelectEntity;   
   constructor( public id: string | number, public uniqueName: string ){}
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