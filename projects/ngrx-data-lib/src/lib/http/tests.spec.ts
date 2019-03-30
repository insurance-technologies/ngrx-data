import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { getRequest, postRequest, deleteRequest, putRequest } from './http-communication';
import { JsonFormatConverter } from '../data-format/json-format-converter';

/**
 * This tests are made using https://github.com/typicode/jsonplaceholder as fake
 * endpoint data.
 */

describe('Http functions Test', ()=>{

    let http: HttpClient;
    
    beforeEach(()=>{             
        TestBed.configureTestingModule({
           imports: [HttpClientModule],
           providers: [HttpClient]
        });   

        http = TestBed.get(HttpClient);        
    });   

    //testing get http method
    it('getRequest', (done)=> {              

        http.get('https://jsonplaceholder.typicode.com/posts').subscribe(goodData => {     
           getRequest(http, 'https://jsonplaceholder.typicode.com/posts', [new JsonFormatConverter()]).subscribe(result=>{            
            expect(objectEquals(goodData, result)).toBe(true);
            done();            
           });           
        });

    });

    //testing post
    it('postRequest', (done)=> {
        
        postRequest(http, 'https://jsonplaceholder.typicode.com/posts', 
        {
            title: 'TEST',
            body: 'TEST_BODY',
            userId: 53
        }, new JsonFormatConverter(), [new JsonFormatConverter()]).subscribe(result=>{

           console.log(result);

           expect(result).toBeTruthy();

           expect(result.id).toBeTruthy();
                
           done();

        })

    });

    
    it('deleteRequest', (done)=> {
        
        deleteRequest(http, 'https://jsonplaceholder.typicode.com/posts/1', [new JsonFormatConverter()]).subscribe(result=>done());

    });

    
    it('putRequest', (done)=> {
        
        putRequest(http, 'https://jsonplaceholder.typicode.com/posts/1', {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
          }, new JsonFormatConverter(), [new JsonFormatConverter()]).subscribe(result=>{

            console.log(result);
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();
            done();
          });
    });
    
})

//copied from stack overflow https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
function objectEquals(x, y) {
    'use strict';

    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return objectEquals(x[i], y[i]); });
}