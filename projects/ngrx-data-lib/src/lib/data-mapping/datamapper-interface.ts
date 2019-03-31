import * as DbActions from '../state/db-actions';



export interface IDataMapper
{
    map(data: any) : DbActions.DBActions[];
}