import { EntityStateCollectionAdapter, EntityStatesCollection } from './entity-states-collection-adapter';
import * as actions from './actions';
import { stat } from 'fs';


const adapter = new EntityStateCollectionAdapter();
const initialState = adapter.getInitialState();


export function reducer(state = initialState, action: actions.ActionsUnion) : EntityStatesCollection
{
    switch(action.type)
    {
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
    }
}