import { Store } from '@ngrx/store';
import { NgrxDataLibModule } from '../ngrx-data-lib.module';
import * as DbActions from '../state/actions';
import * as RequestActions from '../state/request-actions';
import { RequestProvider } from '../http/request-provider';
import { EntityStatesCollection } from '../state/entity-states-collection-adapter';

/**
 * base class for entity services.
 */
export class EntityService<T>
{
   private store: Store<any>;
        
   constructor(private uniqueName: string, private endpoint: string)
   {
      this.store = NgrxDataLibModule.injector.get(Store);
      this.createEntityInDb();
   }

   /**
    * Create the entity in the database
    */
   private createEntityInDb()
   {
      this.store.dispatch(new DbActions.CreateEntityState(this.uniqueName));
   }

   /**
    * Make a request via http that change or get the data of this entity.
    * @param provider The request provider to execute
    */
   public dispatch(provider: RequestProvider)
   {
      this.store.dispatch(new RequestActions.MakeRequest(provider, this.endpoint));
   }

}