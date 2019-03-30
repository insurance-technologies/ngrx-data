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
import { IDataMapper } from './datamapper-interface';
import { ActionsUnion, UpdateMany, AddMany, DeleteMany } from '../state/actions';

interface DataWrapper
{
    [uniqueName: string]: { add:any[], update:any[], delete:string[] }
}

export class EntityArrayMapper implements IDataMapper
{
    map(data: any): ActionsUnion[] {
        
        let result: ActionsUnion[] = [];

        let responseData = data as DataWrapper;
        let uniqueNames = Object.keys(responseData);
        for(let uniqueName in uniqueNames)
        {            
            let entityActions = responseData[uniqueName];
            
            if(entityActions.add)            
               result.push( new AddMany(entityActions.add, uniqueName) );
            
            if(entityActions.update)            
                result.push( new UpdateMany(entityActions.update, uniqueName) );            

            if(entityActions.delete)            
                result.push( new DeleteMany(entityActions.delete, uniqueName) );
        }

        return result;
    }
    
}