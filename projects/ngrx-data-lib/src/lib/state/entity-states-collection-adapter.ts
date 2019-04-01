import { createEntityAdapter, EntityState, Update } from '@ngrx/entity';

/**
 * Database structure.
 */
export interface EntityStatesCollection
{
    /**
     * The entity states by unique name
     */
   [name: string] : ExtendedEntityState;
}

/**
 * entity state structure.
 */
export interface ExtendedEntityState extends EntityState<any>
{
    /**
     * the errors related with this entity state.
     */
    errors: string[];
    /**
     * the number of external requests running.
     */
    loadingTasks: number;
    /**
     * id of the selected entity of this entity state
     */
    selectedId: string | number;
}

/**
 * the adapter to manage the entity changes.
 */
const entityAdapter = createEntityAdapter<any>();
export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal  
  } = entityAdapter.getSelectors();
    

export class EntityStateCollectionAdapter
{   
    /**
     * return the initial state of the collection of entities
     */ 
    getInitialState() : EntityStatesCollection
    {
        return {};                
    }

    /**
     * add an entity state to the EntityStatesCollection.
     * @param name the unique name of the entity state to add.
     * @param state the EntityStatesCollection.
     */
    addEntityState(name: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        //if the entity state already exist no changes are needed
        if(state[name])
          return state;

        //create a shadow copy
        let copy = { ...state };
       
        //add the entity state with the help of the entity adapter
        copy[name] = entityAdapter.getInitialState({
            errors: [],
            loadingTasks: 0,
            selectedId: null
        });

       return copy;
    }

    /**
     * delete entity state from the EntityStatesCollection.
     * @param name the unique name of the entity to delete.
     * @param state the EntityStatesCollection.
     */
    deleteEntityState(name: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        //if the entityState does not exist no change is needed.
        if(!state[name])
          return state;

        //create a shadow copy
        let copy = { ...state };  
        
        //set the entity state to undefine
        copy[name] = undefined;

        return copy;
    }

    /**
     * delete all the entity states for the EntityStatesCollection.
     * @param state the EntityStatesCollection.
     */
    deleteAllEntityStates(state: EntityStatesCollection) : EntityStatesCollection
    {
        return {};
    }


    //actions for specific entity state----------------------------------------------------------------------------------------------------------

    entityStateAddOne(entity: any, uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
       return this.processEntityState(
           (es)=>{

           return entityAdapter.addOne(entity, es);
             
       }
       , uniqueName, state);
    }

    entityStateAddMany(entities: any[], uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{

            return entityAdapter.addMany(entities, es); 
              
        }
        , uniqueName, state);
    }


    entityStateAddAll(entities: any[], uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{
 
                return entityAdapter.addAll(entities, es); 
              
        }
        , uniqueName, state);
    }


    entityStateRemoveOne(id: string, uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{
 
                return entityAdapter.removeOne(id, es); 
              
        }
        , uniqueName, state);
    }   


    entityStateRemoveMany(ids: string[], uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{
 
                return entityAdapter.removeMany(ids, es); 
              
        }
        , uniqueName, state);
    }


    entityStateRemoveAll(uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{
 
                return entityAdapter.removeAll(es); 
              
        }
        , uniqueName, state);
    }


    entityStateUpdateOne(entity: any, uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{
 
                return entityAdapter.updateOne( { id: entity.id, changes: entity } , es); 
              
        }
        , uniqueName, state);
    }


    entityStateUpdateMany(entities: any[], uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{
 
                return entityAdapter.updateMany(entities.map(e=>{return{id: e.id, changes: e}}), es); 
              
        }
        , uniqueName, state);
    }


    entityStateUpsertOne(entity: any, uniqueName: string, state: EntityStatesCollection) : EntityStatesCollection
    {
        return this.processEntityState(
            (es)=>{

                return entityAdapter.upsertOne(entity, es);  
              
        }
        , uniqueName, state);
    }


    entityStateUpsertMany(entities: any[], uniqueName: string, state: EntityStatesCollection)
    {
        return this.processEntityState(
            (es)=>{

                return entityAdapter.upsertMany(entities, es);   
              
        }
        , uniqueName, state);
    }

    private processEntityState(func: (entityState: ExtendedEntityState)=>ExtendedEntityState, uniqueName: string, state: EntityStatesCollection)
    {
        let entityState = state[uniqueName];
        if(!entityAdapter)
          return state;
 
        entityState = func(entityState);
          
        let copy = {...state};
        copy[uniqueName] = entityState;
        return copy;
    }

    

}