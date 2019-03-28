import {EntityState} from '@ngrx/entity'

export interface EntityStatesCollection
{
   [name: string] : ExtendedEntityState<any>;
}

export interface ExtendedEntityState<T> extends EntityState<T>
{
    selectedId: string | number;
    isLoading: boolean;
    errors: string[];
    validation: string[];
}

