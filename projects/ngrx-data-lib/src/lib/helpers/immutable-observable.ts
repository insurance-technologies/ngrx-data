import { Observable, combineLatest, Subject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * an special observable that mantains the data inmutable
 * and you can always reset the data to the orginal value
 */
export class ImmutableObservable<T> extends Observable<T>
{
    private resetObservable$ : Subject<{ lastValue: boolean, val: T }>;
    private lastValue: T;

    constructor(source: Observable<T>)
    {        
        super((observer)=>{
          
           merge(source.pipe(map(v=> {return{ lastValue: false, val: v as T }} )), this.resetObservable$)
           .subscribe(
               (next)=>{
                  
                if(!next.lastValue)                
                   this.lastValue = next.val;                
                
                let val = next.val;   
                let copy = makeShadowCopy(val);
                
                //shadow copy of the value
                observer.next( copy );
               },
               
               (error)=>{
                  observer.error(error);
               },

               //complete
               ()=>{
                  observer.complete();
               }               
           );

       });

       this.resetObservable$ = new Subject<{ lastValue: boolean, val: T }>();
    }
    
    reset() : void
    {
        if(this.lastValue)
          this.resetObservable$.next({lastValue: true, val: this.lastValue});
    }
}

//How to make customs operators https://angularfirebase.com/lessons/custom-rxjs-operators-by-example/
/**
 * convert to an inmutable observable.
 */
export const makeImmutable = () => (source: Observable<any>) => 
    {     
       return new ImmutableObservable(source);
    };

function makeShadowCopy(value: any) : any
{
   //make copy of every item if it is array
   if(Array.isArray(value))   
      return makeArrayCopy(value as []);
   
   //make shadow copy of the object
   if(typeof value == 'object')
   {
      let objVal = value as {};
      return { ...objVal };
   }
   
   //we can return string because they are inmutable.
   //for values like number they are passed by value and not by reference, so is safe to return them.
   //for functions just return the value because they are inmutable as well.
   return value;
}

function makeArrayCopy(value: []) : any[]
{
   let result = [];

   //for each item make a shadow copy
   for(let i = 0; i < value.length; i++)
     result.push( makeShadowCopy(value[i]) );

   return result;
}