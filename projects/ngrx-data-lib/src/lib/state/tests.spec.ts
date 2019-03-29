import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { EntityStateCollectionAdapter } from './entity-states-collection-adapter';
import { stat } from 'fs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

describe('Database State adapter', ()=>{

    let collectionAdapter: EntityStateCollectionAdapter;

    beforeEach(()=>{        
        collectionAdapter = new EntityStateCollectionAdapter();
    });

    it('create new entityState in the db', ()=>{
        let state;
        
        state = collectionAdapter.getInitialState();
        expect(state).toBeTruthy();

        state = collectionAdapter.addEntityState('entityA', state);
        expect(state.entityA).toBeTruthy();
        expect(state.entityA.ids).toBeTruthy();
        expect(state.entityA.entities).toBeTruthy();
    });

    it('create new entityState and removing it from the db', () => {
        let state;
        
        state = collectionAdapter.getInitialState();
        expect(state).toBeTruthy();

        state = collectionAdapter.addEntityState('entityA', state);
        expect(state.entityA).toBeTruthy();
        expect(state.entityA.ids).toBeTruthy();
        expect(state.entityA.entities).toBeTruthy();

        state = collectionAdapter.deleteEntityState('entityA', state);
        expect(state.entityA).toBeUndefined();
    })

    it('create new entities and deleteing all', () => {

        let state;
        
        state = collectionAdapter.getInitialState();
        expect(state).toBeTruthy();

        state = collectionAdapter.addEntityState('entityA', state);
        expect(state.entityA).toBeTruthy();
        expect(state.entityA.ids).toBeTruthy();
        expect(state.entityA.entities).toBeTruthy();

        state = collectionAdapter.addEntityState('entityB', state);
        expect(state.entityB).toBeTruthy();
        expect(state.entityB.ids).toBeTruthy();
        expect(state.entityB.entities).toBeTruthy();

        state = collectionAdapter.addEntityState('entityC', state);
        expect(state.entityC).toBeTruthy();
        expect(state.entityC.ids).toBeTruthy();
        expect(state.entityC.entities).toBeTruthy();

        state = collectionAdapter.deleteAllEntityStates(state);
        expect(state.entityA).toBeUndefined();
        expect(state.entityB).toBeUndefined();
        expect(state.entityC).toBeUndefined();
    })

})

describe('Database State adapter, Entity State', ()=>{

    let collectionAdapter: EntityStateCollectionAdapter;

    beforeAll(()=>{       
       collectionAdapter = new EntityStateCollectionAdapter();       
    });

    it('entityStateAddOne', ()=>{

        let state = collectionAdapter.addEntityState('testEntityState', collectionAdapter.getInitialState());
        
        state = collectionAdapter.entityStateAddOne({ id: '1', name: 'Ale', number: 34 }, 'testEntityState', state);
        expect(state.testEntityState.ids.length).toBeGreaterThan(0);
        expect(state.testEntityState.entities['1']).toBeTruthy();
        expect(state.testEntityState.entities['1'].name).toBe('Ale');
        expect(state.testEntityState.entities['1'].number).toBe(34);
    })

    it('entityStateAddMany', ()=>{

        let state = collectionAdapter.addEntityState('testEntityState', collectionAdapter.getInitialState());
        let data = [];
        for(let i = 0; i < 1000; i++)
        {
            data.push( 
            { 
                id: i.toString(),
                name: 'name ' + i
            });
        }
        state = collectionAdapter.entityStateAddMany(data, 'testEntityState', state);
        expect(state.testEntityState.ids.length).toBe(1000);
        for(let i = 999; i >= 0; i--)
        {            
            expect(state.testEntityState.entities[i]).toBeTruthy();
            expect(state.testEntityState.entities[i].name).toBe('name ' + i);
        }
    })

    it('entityStateAddAll', ()=>{

        let state = collectionAdapter.addEntityState('testEntityState', collectionAdapter.getInitialState());
        let data = [];
        for(let i = 0; i < 1000; i++)
        {
            data.push( 
            { 
                id: i.toString(),
                name: 'name ' + i
            });
        }
        state = collectionAdapter.entityStateAddMany(data, 'testEntityState', state);

        data = [];
        for(let i = 1000; i < 2000; i++)
        {
            data.push( 
            { 
                id: i.toString(),
                name: 'name ' + i
            });
        }

        state = collectionAdapter.entityStateAddAll(data, 'testEntityState', state);

        expect(state.testEntityState.ids.length).toBe(1000);
        for(let i = 1999; i >= 1000; i--)
        {            
            expect(state.testEntityState.entities[i]).toBeTruthy();
            expect(state.testEntityState.entities[i].name).toBe('name ' + i);
        }

    })

    it('entityStateRemoveOne', () => {

        let state = collectionAdapter.addEntityState('testEntityState', collectionAdapter.getInitialState());
        let data = [];
        for(let i = 0; i < 1000; i++)
        {
            data.push( 
            { 
                id: i.toString(),
                name: 'name ' + i
            });
        }
        state = collectionAdapter.entityStateAddMany(data, 'testEntityState', state);

        let randomId = getRandomInt(1, 998).toString();
        state = collectionAdapter.entityStateRemoveOne(randomId, 'testEntityState', state);
        expect(state.testEntityState.entities[randomId]).toBeUndefined();

    })

    it('entityStateRemoveMany', ()=>{

        let state = collectionAdapter.addEntityState('testEntityState', collectionAdapter.getInitialState());
        let data = [];
        for(let i = 0; i < 1000; i++)
        {
            data.push( 
            { 
                id: i.toString(),
                name: 'name ' + i
            });
        }
        state = collectionAdapter.entityStateAddMany(data, 'testEntityState', state);

        let usedIds: {} = {};
        let randomIds: string[] = [];

        for(let i = 0; i < 50; i++)
        {
            let randomId: string;
            do{
               randomId = getRandomInt(1, 999);
            }while(usedIds[randomId])
            randomIds.push(randomId);
            usedIds[randomId] = true;
        }

        state = collectionAdapter.entityStateRemoveMany(randomIds, 'testEntityState', state);
        for(let i = 0; i < randomIds.length; i++)
        {
            expect(state.testEntityState.entities[randomIds[i]]).toBeUndefined();
        }

    })

})


//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}