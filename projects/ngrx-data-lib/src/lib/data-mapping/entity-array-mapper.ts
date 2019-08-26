/**
 * Data mapper that maps actions with data
 * Data Ex:
 * {
 *    users: {
 *       add:[
 *         {
 *          "name": "Jhon",
 *          "favoriteColor": "red"
 *         },
 *         {
 *          "name": "Jhon",
 *          "favoriteColor": "red"
 *         }
 *       ]
 *    }
 * 
 * }
 */
import { IDataMapper } from './datamapper';
import { DBActions, UpdateMany, AddMany, DeleteMany } from '../state/db-actions';
import { HttpMethod } from '../http/http-method';
import { EntityStatesCollection } from '../state/entity-states-collection-adapter';
import { addMany, updateMany, removeMany } from '../state/action.functions';

interface DataWrapper {
    [uniqueName: string]: { add: any[], update: any[], delete: string[] }
}

export function entityArrayMapper(data: any, uniqueName: string, requestType: HttpMethod, dbState: EntityStatesCollection): DBActions[] {

    let result: DBActions[] = [];

    let responseData = data as DataWrapper;
    let uniqueNames = Object.keys(responseData);
    for (let i = 0; i < uniqueNames.length; i++) {

        let uniqueName = uniqueNames[i];
        if(!dbState[uniqueName])
          throw 'The entity state with unique name ' + uniqueName + ' is not in the state.';

        let entityActions = responseData[uniqueName];

        if (entityActions.add)
            result.push( addMany(uniqueName, entityActions.add) );

        if (entityActions.update)
            result.push( updateMany(uniqueName, entityActions.delete) );

        if (entityActions.delete)
            result.push( removeMany(uniqueName, data.delete) );
            
    }

    return result;


}