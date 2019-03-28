import { Action } from '@ngrx/store';

export enum DataEntitiesStateActionTypes
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
    DeleteMany = '[DataEntitiesDB] DeleteAll',
    Update = '[DataEntitiesDB] Update',
    UpdateMany = '[DataEntitiesDB] UpdateMany',    
}

//actions that affect the database
export class CreateEntityState implements Action
{
   type = DataEntitiesStateActionTypes.CreateEntityState;   
   constructor( public uniqueName: string ){}
}

export class DeleteEntityState implements Action
{
   type = DataEntitiesStateActionTypes.DeleteEntityState;   
   constructor( public uniqueName: string ){}
}

export class DeleteAllEntityStates implements Action
{
    type = DataEntitiesStateActionTypes.DeleteAllEntityStates;    
}


//actions that affect only specific entity
export class AddEntityToState implements Action
{
   type = DataEntitiesStateActionTypes.AddEntityToState;   
   constructor( public uniqueName: string ){}
}


export class AddMany implements Action
{
   type = DataEntitiesStateActionTypes.AddMany;   
   constructor( public uniqueName: string ){}
}


export class DeleteEntityFromState implements Action
{
   type = DataEntitiesStateActionTypes.DeleteEntityFromState;   
   constructor( public uniqueName: string ){}
}


export class DeleteAll implements Action
{
   type = DataEntitiesStateActionTypes.DeleteAll;   
   constructor( public uniqueName: string ){}
}


export class DeleteMany implements Action
{
   type = DataEntitiesStateActionTypes.DeleteMany;   
   constructor( public uniqueName: string ){}
}


export class Update implements Action
{
   type = DataEntitiesStateActionTypes.Update;   
   constructor( public uniqueName: string ){}
}


export class UpdateMany implements Action
{
   type = DataEntitiesStateActionTypes.UpdateMany;   
   constructor( public uniqueName: string ){}
}

export type DataEntitiesStateActions = 
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
UpdateMany
;