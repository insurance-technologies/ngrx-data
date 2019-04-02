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

interface DataWrapper {
    [uniqueName: string]: { add: any[], update: any[], delete: string[] }
}

export function entityArrayMapper(data: any): DBActions[] {

    let result: DBActions[] = [];

    let responseData = data as DataWrapper;
    let uniqueNames = Object.keys(responseData);
    for (let i = 0; i < uniqueNames.length; i++) {
        let uniqueName = uniqueNames[i];
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