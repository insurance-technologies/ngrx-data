import * as DbActions from '../state/db-actions';


export interface IDataMapper
{
    (data: any) : DbActions.DBActions[];
}