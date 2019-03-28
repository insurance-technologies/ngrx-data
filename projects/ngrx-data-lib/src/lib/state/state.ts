import { EntityStateCollectionAdapter, EntityStatesCollection } from './entity-states-collection-adapter';
import { DataEntitiesStateActions, DataEntitiesStateActionTypes, CreateEntityState } from './actions';


const adapter = new EntityStateCollectionAdapter();
const initialState = adapter.getInitialState();


export function reducer(state: EntityStatesCollection = initialState, action: DataEntitiesStateActions) : EntityStatesCollection
{
    switch(action.type)
    {
        case DataEntitiesStateActionTypes.CreateEntityState:
          return adapter.addEntityState( action.uniqueName, state);         
          
        case DataEntitiesStateActionTypes.DeleteEntityState:
          return adapter.addEntityState( action.uniqueName, state);         
    }
}