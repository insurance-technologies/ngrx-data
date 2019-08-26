import { CreateEntityState, DeleteEntityState, AddEntityToState, AddMany, DeleteAll, Update } from './db-actions';
import { DeleteEntityFromState, DeleteMany, UpdateMany } from 'ngrx-data-lib/public_api';

/**
 * add an entity to the state
 * @param name unique name of the entity state.
 * @param value value to add
 */
export function add(name: string, value: any) {
    return new AddEntityToState(value, name);
}

/**
 * add many entitities to the state.
 * @param name unique name of the entity state
 * @param values values to be added
 */
export function addMany(name: string, values: any[]) {
    return new AddMany(values, name);
}

/**
 * remove entity from state
 * @param name unique name of the entity state
 * @param id id of the entity to remove
 */
export function remove(name: string, id: string) {
    return new DeleteEntityFromState(id, name);
}

/**
 * remove many entities from the state
 * @param name unique name of the entity state
 * @param ids the ids to remove
 */
export function removeMany(name: string, ids: string[]) {
    return new DeleteMany(ids, name);
}

/**
 * remove all entities from store
 * @param name unique name of the entity state
 */
export function clear(name: string) {
    return new DeleteAll(name);
}

/**
 * update an existing entity in the state.
 * @param name unique name of the entity state
 * @param value value to update
 */
export function update(name: string, value: any) {
    return new Update(name, value);
}

/**
 * update many entities in the state
 * @param name unique name of the entity store
 * @param values values to be updated
 */
export function updateMany(name: string, values: any[]){
    return new UpdateMany(values, name);
}