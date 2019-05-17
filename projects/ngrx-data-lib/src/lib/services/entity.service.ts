import { Store, select, MemoizedSelector, createSelector } from '@ngrx/store';
import { NgrxDataLibModule } from '../ngrx-data-lib.module';
import * as DbActions from '../state/db-actions';
import * as RequestActions from '../state/request-actions';
import { RequestProvider } from '../http/request-provider';
import { EntityStatesCollection, ExtendedEntityState } from '../state/entity-states-collection-adapter';
import { NgrxDataConfigurationService } from './configuaration.service';
import { DataService } from './entity-data.service';
import { Observable, combineLatest } from 'rxjs';
import * as dbAdapter from '../state/entity-states-collection-adapter';
import { Dictionary, EntityState } from '@ngrx/entity';
import { map, filter, take } from 'rxjs/operators';
import { makeImmutable, ImmutableObservable } from '../helpers/immutable-observable';
import { v1 } from 'uuid';
import { getDB } from '../state/state';
import { SelectEntity } from '../state/db-actions';
import { IDomainModelFactory } from '../domain-model/domain-model.factory';
import { Router, ActivatedRoute } from '@angular/router';

const errors = (state: ExtendedEntityState) => state.errors;
const isLoading = (state: ExtendedEntityState) => state.loadingTasks > 0;
const selectedId = (state: ExtendedEntityState) => state.selectedId;

/**
 * base class for entity services.
 */
export abstract class EntityService<T, M = {}>
{
   private store: Store<any>;
   private route: ActivatedRoute;
   private router: Router;
   private configService: NgrxDataConfigurationService;
   private dataService: DataService;
   private domainModelFactory: IDomainModelFactory<T, M> = null;

   private entityState$: Observable<ExtendedEntityState>;

   private entityStateSelector: MemoizedSelector<EntityStatesCollection, ExtendedEntityState>;

   private getAll: MemoizedSelector<object, T[]>;
   private getEntities: MemoizedSelector<object, Dictionary<T>>;
   private getIds: MemoizedSelector<object, string[] | number[]>;
   private getTotal: MemoizedSelector<object, number>;

   private getErrors: MemoizedSelector<object, string[]>;
   private getIsLoading: MemoizedSelector<object, boolean>;
   private getSelectedId: MemoizedSelector<object, string | number>;

   private all$: Observable<T[]>;
   private entities$: Observable<Dictionary<T>>;
   private ids$: Observable<string[] | number[]>;
   private total$: Observable<number>;
   private errors$: Observable<string[]>;
   private isLoading$: Observable<boolean>;
   private selectedId$: Observable<string | number>;
   private selectedEntity$: Observable<T>;

   public get GET(): RequestProvider {
      return this.dataService.GET;
   }


   public get POST(): RequestProvider {
      return this.dataService.POST;
   }


   public get PUT(): RequestProvider {
      return this.dataService.PUT;
   }


   public get DELETE(): RequestProvider {
      return this.dataService.DELETE;
   }

   constructor(
      private uniqueName: string,
      private endpoint: string,
      private options?: {
         routerParamName?: string,
         domainModelFactory?: IDomainModelFactory<T, M>
      }
   ) {
      this.store = NgrxDataLibModule.injector.get(Store);
      this.route = NgrxDataLibModule.injector.get(ActivatedRoute);
      this.router = NgrxDataLibModule.injector.get(Router);
      this.configService = NgrxDataLibModule.injector.get(NgrxDataConfigurationService);
      this.dataService = NgrxDataLibModule.injector.get(DataService);
      this.createEntityInDb();

      // assign the optional properties
      if (options) {

         if (options.routerParamName) {
            this.configService.routerParamNames.set(options.routerParamName, uniqueName);
         }

         if (options.domainModelFactory) {
            this.domainModelFactory = options.domainModelFactory;
         }
      }
   }

   /**
    * Create the entity in the database
    */
   private createEntityInDb() {
      this.store.pipe(
         map(s => s.entityDb as EntityStatesCollection), // map the database
         filter(db => db[this.uniqueName] ? true : false), // if exist the entityState of this service
         take(1)).subscribe((v) => {
            this.createSelectors();
            this.checkRouter();
         }); // we take only one to create the selectors.

      this.store.dispatch(new DbActions.CreateEntityState(this.uniqueName));
   }

   private createSelectors() {
      this.entityStateSelector = createSelector(getDB, (s) => s[this.uniqueName]);

      this.getAll = createSelector(this.entityStateSelector, dbAdapter.selectAll);
      this.getEntities = createSelector(this.entityStateSelector, dbAdapter.selectEntities);
      this.getIds = createSelector(this.entityStateSelector, dbAdapter.selectIds);
      this.getTotal = createSelector(this.entityStateSelector, dbAdapter.selectTotal);

      this.entityState$ = this.store.select(this.entityStateSelector);

      this.getIsLoading = createSelector(this.entityStateSelector, isLoading);
      this.getErrors = createSelector(this.entityStateSelector, errors);
      this.getSelectedId = createSelector(this.entityStateSelector, selectedId);

      // using the Entity adapter selectors to select the entites
      this.all$ = this.store.select(this.getAll);
      this.entities$ = this.store.select(this.getEntities);
      this.ids$ = this.store.select(this.getIds);
      this.total$ = this.store.select(this.getTotal);
      this.isLoading$ = this.store.select(this.getIsLoading);
      this.errors$ = this.store.select(this.getErrors);
      this.selectedId$ = this.store.select(this.getSelectedId);
      this.selectedEntity$ = combineLatest(this.entities$, this.selectedId$).pipe(map(([entities, id]) => entities[id]));
   }

   private checkRouter() {

      if (this.options && this.options.routerParamName) {
         const id = this.getParam(this.route.root);
         this.selectEntity(id);
      }
   }

   private getParam(route: ActivatedRoute): string | number {

      if (route.snapshot.paramMap.has(this.options.routerParamName)) {
         return route.snapshot.paramMap.get(this.options.routerParamName);
      }

      if (route.children.length === 0) {
         return null;
      }

      for (let i = 0; i < this.route.children.length; i++) {
         const param = this.getParam(route.children[i]);
         if (param) {
            return param;
         }
      }

      return null;
   }

   /**
    * Make request to get all entitites. url: GET {endpoint}
    * @param id id of the entity
    */
   public dispatchGet(id: string) {
      this.dispatch(this.GET);
   }

   /**
    * Make request to get entity by id. url: {endpoint}/{id}
    * @param id id of the entity
    */
   public dispatchGetById(id: string) {
      this.dispatch(this.GET.at(id));
   }

   /**
    * Make request to add entity. POST request at {endpoint}
    * @param entity the entity to add
    */
   public dispatchAddEntity(entity: T) {
      this.dispatch(this.POST);
   }

   /**
    * Make a request to update entity. PUT request at {endpoint}
    * @param entity the entity to update
    */
   public dispatchUpdateEntity(entity: T) {
      this.dispatch(this.PUT);
   }

   /**
    * Make a request to delete entity. DELETE request at {endpoint}/{id}
    * @param id the id of the entity to delete
    */
   public dispatchDeleteEntity(id: string) {
      this.dispatch(this.DELETE.at(id));
   }

   /**
    * select entity with specific id.
    */
   public selectEntity(id: string | number): void {
      this.store.dispatch(new SelectEntity(id, this.uniqueName));
   }

   /**
    * returns a boolean observable that indicates background work related with this entity state.
    */
   public selectIsLoading(): Observable<boolean> {
      return this.isLoading$;
   }

   /**
    * returns an Observable for the errors related with this entity state.
    * @param f filter function to filter the errors.
    */
   public selectErrors(f?: (e: string) => boolean): Observable<string[]> {
      if (f) {
         return this.errors$.pipe(map(e => e.filter(f)));
      } else {
         return this.errors$;
      }
   }

   public selectSelectedEntity(): ImmutableObservable<T> {
      return this.selectedEntity$.pipe(makeImmutable()) as ImmutableObservable<T>;
   }

   public selectSelectedDomainModel(): ImmutableObservable<M> {
      if (!this.domainModelFactory) {
         throw new Error('No factory function provided');
      }

      return this.selectedEntity$.pipe(map(e => this.domainModelFactory(e)), makeImmutable()) as ImmutableObservable<M>;
   }

   /**
    * returns as InmutableObservable of the data.
    * @param f filter function to filter the data.
    */
   public select(f?: (e: T) => boolean): ImmutableObservable<T[]> {
      if (f) {
         return this.all$.pipe(map(e => e.filter(f)), makeImmutable()) as ImmutableObservable<T[]>;
      } else {
         return this.all$.pipe(makeImmutable(), map(e => e.map(i => this.domainModelFactory(i)))) as ImmutableObservable<T[]>;
      }
   }


   public selectDomainModel(f?: (e: T) => boolean): ImmutableObservable<M[]> {

      if (!this.domainModelFactory) {
         throw new Error('No factory function provided');
      }

      if (f) {
         return this.all$.pipe(
            map(e => e.filter(f)),
            map(e => e.map(i => this.domainModelFactory(i))),
            makeImmutable()) as ImmutableObservable<M[]>;
      } else {
         return this.all$.pipe(makeImmutable(), map(e => e.map(i => this.domainModelFactory(i)))) as ImmutableObservable<M[]>;
      }
   }

   /**
    * returns InmutableObservable of an entity with specific id
    * @param id the id of the entity
    */
   public selectById(id: string): ImmutableObservable<T> {

      if (this.domainModelFactory) {
         return this.entities$.pipe(map(e => e[id]), map(e => this.domainModelFactory(e)), makeImmutable()) as ImmutableObservable<T>;
      } else {
         return this.entities$.pipe(map(e => e[id]), makeImmutable()) as ImmutableObservable<T>;
      }
   }

   /**
    * get Observable of the quantity of entities.
    */
   public selectTotal(): Observable<number> {
      return this.total$;
   }

   /**
    * Make a request via http that change or get the data of this entity.
    * @param provider The request provider to execute
    */
   public dispatch(provider: RequestProvider) {
      const uid = v1();
      this.configService.injectRequestProvider(uid, provider);
      this.store.dispatch(new RequestActions.MakeRequest(uid, this.endpoint, this.uniqueName));
   }

}
