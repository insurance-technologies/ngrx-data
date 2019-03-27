import {EntityState} from '@ngrx/entity'

export interface DataEntitiesState
{
   [name: string] : ExtendedEntityState<any>;
}

export interface ExtendedEntityState<T> extends EntityState<T>
{
    stateName: string;
    selectedId: string | number;
    isLoading: boolean;
    errors: string[];
    validation: string[];
}

