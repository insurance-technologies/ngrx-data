import { EntityStateCollectionAdapter, EntityStatesCollection } from './entity-states-collection-adapter';
import * as actions from './db-actions';
import * as requestActions from './request-actions';
import { AllActions } from './all-actions';

const adapter = new EntityStateCollectionAdapter();
export const initialState = adapter.getInitialState();


export function reducer(state = initialState, action: AllActions) : EntityStatesCollection
{
    let copyState, es;
    switch(action.type)
    {
        case requestActions.ActionTypes.MakeRequest:
          copyState = {...state};
          es = copyState[action.uniqueName];          
          copyState[action.uniqueName] = {...es, loadingTasks: es.loadingTasks + 1}
          return copyState;           

        case requestActions.ActionTypes.SuccessMapping:
          copyState = {...state};
          es = copyState[action.uniqueName];
          copyState[action.uniqueName] = {...es, loadingTasks: es.loadingTasks - 1}
          return copyState;    
          
        case requestActions.ActionTypes.RequestError:
          copyState = {...state};
          es = copyState[action.uniqueName];
          copyState[action.uniqueName] = {...es, loadingTasks: es.loadingTasks - 1, errors: action.errors}
          return copyState;    

        case actions.ActionTypes.CreateEntityState:
          return adapter.addEntityState( action.uniqueName, state);         
          
        case actions.ActionTypes.DeleteEntityState:
          return adapter.addEntityState( action.uniqueName, state); 
          
        case actions.ActionTypes.DeleteAllEntityStates:
          return adapter.deleteAllEntityStates(state);

        case actions.ActionTypes.AddEntityToState:
          return adapter.entityStateAddOne(action.entity, action.uniqueName, state);

        case actions.ActionTypes.AddMany:
          return adapter.entityStateAddMany(action.entities, action.uniqueName, state);

        case actions.ActionTypes.DeleteEntityFromState:
          return adapter.entityStateRemoveOne(action.id, action.uniqueName, state);

        case actions.ActionTypes.DeleteAll:
          return adapter.entityStateRemoveAll(action.uniqueName, state);

        case actions.ActionTypes.DeleteMany:
          return adapter.entityStateRemoveMany(action.ids, action.uniqueName, state);

        case actions.ActionTypes.Update:
          return adapter.entityStateRemoveMany(action.entity, action.uniqueName, state);

        case actions.ActionTypes.UpdateMany:
          return adapter.entityStateRemoveMany(action.entities, action.uniqueName, state);

        default:
          return state;  
    }    
}

