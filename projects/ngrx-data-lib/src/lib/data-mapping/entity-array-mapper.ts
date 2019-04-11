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
            result.push(new AddMany(entityActions.add, uniqueName));

        if (entityActions.update)
            result.push(new UpdateMany(entityActions.update, uniqueName));

        if (entityActions.delete)
            result.push(new DeleteMany(entityActions.delete, uniqueName));
    }

    return result;


}