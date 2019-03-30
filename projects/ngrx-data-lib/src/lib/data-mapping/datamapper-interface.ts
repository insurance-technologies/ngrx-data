import * as DbActions from '../state/actions';



export interface IDataMapper
{
    map(data: any) : DbActions.ActionsUnion[];
}