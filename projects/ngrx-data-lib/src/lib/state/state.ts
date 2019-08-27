import { EntityStateCollectionAdapter, EntityStatesCollection } from './entity-states-collection-adapter';
import * as actions from './db-actions';
import * as requestActions from './request-actions';
import { AllActions } from './all-actions';
import { createFeatureSelector, Action } from '@ngrx/store';
import { act } from '@ngrx/effects';

const adapter = new EntityStateCollectionAdapter();
export const initialState = adapter.getInitialState();


export function reducer(state = initialState, action: any): EntityStatesCollection {
  let copyState, es;
  //switch(action.type)
  //{

  if (action.type.startsWith(requestActions.ActionTypes.MakeRequest)) {
    copyState = { ...state };
    es = copyState[action.uniqueName];
    copyState[action.uniqueName] = { ...es, loadingTasks: es.loadingTasks + 1 }
    return copyState;
  }

  if (action.type.startsWith(requestActions.ActionTypes.SuccessMapping)) {
    copyState = { ...state };
    es = copyState[action.uniqueName];
    copyState[action.uniqueName] = { ...es, loadingTasks: es.loadingTasks - 1 }
    return copyState;
  }

  if (action.type.startsWith(requestActions.ActionTypes.RequestError)) {
    copyState = { ...state };
    es = copyState[action.uniqueName];
    copyState[action.uniqueName] = { ...es, loadingTasks: es.loadingTasks - 1, errors: action.errors }
    return copyState;
  }

  if (action.type.startsWith(actions.ActionTypes.CreateEntityState)) {
    return adapter.addEntityState(action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.DeleteEntityState)) {
    return adapter.addEntityState(action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.DeleteAllEntityStates)) {
    return adapter.deleteAllEntityStates(state);
  }

  if (action.type.startsWith(actions.ActionTypes.AddEntityToState)) {
    return adapter.entityStateAddOne(action.entity, action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.AddMany)) {
    return adapter.entityStateAddMany(action.entities, action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.DeleteEntityFromState)) {
    return adapter.entityStateRemoveOne(action.id, action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.DeleteAll)) {
    return adapter.entityStateRemoveAll(action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.DeleteMany)) {
    return adapter.entityStateRemoveMany(action.ids, action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.Update)) {
    return adapter.entityStateUpdateOne(action.entity, action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.UpdateMany)) {
    return adapter.entityStateUpdateMany(action.entities, action.uniqueName, state);
  }

  if (action.type.startsWith(actions.ActionTypes.SelectEntity)) {
    return adapter.selectEntityId(action.id, action.uniqueName, state);
  }

  return state;
  //}    
}

export const getDB = createFeatureSelector('entityDb');

