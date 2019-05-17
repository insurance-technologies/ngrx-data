import * as DbActions from '../state/db-actions';
import { HttpMethod } from '../http/http-method';
import { EntityStatesCollection } from '../state/entity-states-collection-adapter';

export type IDataMapper =
    (data: any, uniqueName: string, requestType: HttpMethod, dbState: EntityStatesCollection) => DbActions.DBActions[];
