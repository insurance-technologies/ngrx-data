import { Store } from '@ngrx/store';
import { EntityStatesCollection } from '../state/state';




/**
 * base class for entity services.
 */
export abstract class EntityService<T>
{
   constructor(private uniqueName: string, private store: Store<EntityStatesCollection>)
   {
      
   }
}
