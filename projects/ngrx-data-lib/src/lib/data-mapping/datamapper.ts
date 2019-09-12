import * as DbActions from '../state/db-actions';
import { HttpMethod } from '../http/http-method';
import { EntityStatesCollection } from '../state/entity-states-collection-adapter';

export interface MapperData {
    data: any;
    uniqueName: string;
    requestType: HttpMethod;
    requestBody?: any;
    dbState: EntityStatesCollection;
}
export declare type IDataMapper = (mapperData: MapperData) => DbActions.DBActions[];
