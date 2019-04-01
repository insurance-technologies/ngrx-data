import { Store, select } from '@ngrx/store';
import { NgrxDataLibModule } from '../ngrx-data-lib.module';
import * as DbActions from '../state/db-actions';
import * as RequestActions from '../state/request-actions';
import { RequestProvider } from '../http/request-provider';
import { EntityStatesCollection, ExtendedEntityState } from '../state/entity-states-collection-adapter';
import { NgrxDataConfigurationService } from './configuaration.service';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { DataService } from './entity-data.service';
import { Observable } from 'rxjs';
import * as dbAdapter from '../state/entity-states-collection-adapter';
import { Dictionary, EntityState } from '@ngrx/entity';
import { map, filter } from 'rxjs/operators';
import { makeImmutable, ImmutableObservable } from '../helpers/immutable-observable';

/**
 * base class for entity services.
 */
export abstract class EntityService<T>
{
   private store: Store<any>;
   private configService: NgrxDataConfigurationService;
   private dataService: DataService;
   
   private entityState$: Observable<ExtendedEntityState>;

   private all$ : Observable<T[]>;
   private entities$ : Observable<Dictionary<T>>;
   private ids$ : Observable<string[] | number[]>;
   private total$ : Observable<number>;
        
   constructor(private uniqueName: string, private endpoint: string)
   {
      this.store = NgrxDataLibModule.injector.get(Store);
      this.configService = NgrxDataLibModule.injector.get(NgrxDataConfigurationService);
      this.dataService = NgrxDataLibModule.injector.get(DataService);
      this.createEntityInDb();
   }

   /**
    * Create the entity in the database
    */
   private createEntityInDb()
   {
      this.store.dispatch(new DbActions.CreateEntityState(this.uniqueName));
      this.createObservables();
   }

   private createObservables()
   {
      this.entityState$ = this.store.pipe(
          map(state=>state.entityDb as EntityStatesCollection), //map to the entity database
          filter(db=>db[this.uniqueName] ? true : false), //only if this entity state exist
          map(db=>db[this.uniqueName])); //map by this entity state.

      //using the Entity adapter selectors to select the entites
      this.all$ = this.entityState$.pipe(map(dbAdapter.selectAll));
      this.entities$ = this.entityState$.pipe(map(dbAdapter.selectEntities));
      this.ids$ = this.entityState$.pipe(map(dbAdapter.selectIds));
      this.total$ = this.entityState$.pipe(map(dbAdapter.selectTotal));
   }

   /**
    * Make request to get entity by id. url: {endpoint}/{id}
    * @param id id of the entity
    */
   public dispatchGetById(id: string)
   {
      this.dispatch(this.dataService.GET.at(id));
   }

   /**
    * Make request to add entity. POST request at {endpoint}
    * @param entity the entity to add
    */
   public dispatchAddEntity(entity: T)
   {
      this.dispatch(this.dataService.POST);
   }

   /**
    * Make a request to update entity. PUT request at {endpoint}
    * @param entity the entity to update
    */
   public dispatchUpdateEntity(entity: T)
   {
      this.dispatch(this.dataService.PUT);
   }

   /**
    * Make a request to delete entity. DELETE request at {endpoint}/{id}
    * @param id the id of the entity to delete
    */
   public dispatchDeleteEntity(id: string)
   {
      this.dispatch(this.dataService.DELETE.at(id));
   }

   /**
    * returns as InmutableObservable of the data.
    * @param f filter function to filter the data.
    */
   public select( f?: (e: T)=>boolean ) : ImmutableObservable<T[]>
   {
      if(f)
       return this.all$.pipe( map( e=>e.filter(f) ), makeImmutable() ) as ImmutableObservable<T[]>;
      else
       return this.all$.pipe( makeImmutable() ) as ImmutableObservable<T[]>;
   }
   
   /**
    * returns InmutableObservable of an entity with specific id
    * @param id the id of the entity
    */
   public selectById(id:string) : ImmutableObservable<T>
   {
      return this.entities$.pipe( map(e=>e[id]), makeImmutable() ) as ImmutableObservable<T>;
   }
   
   /**
    * get Observable of the quantity of entities.
    */
   public selectTotal() : Observable<number>
   {
      return this.total$;
   }

   /**
    * Make a request via http that change or get the data of this entity.
    * @param provider The request provider to execute
    */
   public dispatch(provider: RequestProvider)
   {
      let uid = 'a';
      this.configService.injectRequestProvider(uid, provider);
      this.store.dispatch(new RequestActions.MakeRequest(uid, this.endpoint));
   }

}
