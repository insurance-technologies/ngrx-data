import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';

class modelA{
    id: string;
    a: string;
    b: string;
    c: string;
}

class modelB{
    id: number;
    d: string;
    f: string;
    g: string;
}


describe('State test', ()=>{

    beforeEach(()=>TestBed.configureTestingModule({}));

    it('adapter with multiple types', ()=> {

        let adapter = createEntityAdapter<any>();
        
        expect(adapter).toBeTruthy();

        let stateOne = adapter.getInitialState();
        let stateTwo = adapter.getInitialState();
        
        console.log(stateOne);
        console.log(stateTwo);

        let mA = new modelA();
        mA.id = '2345-2134-23112-1321'
        mA.a = 'a';
        mA.b = 'b';
        mA.c = 'c';

        let mB = new modelB();
        mB.id = 0;
        mB.d = 'd';
        mB.f = 'f';
        mB.g = 'g';

        stateOne = adapter.addOne(mA, stateOne);
        stateTwo = adapter.addOne(mB, stateTwo);

        console.log(stateOne);
        console.log(stateTwo);
    })
})
