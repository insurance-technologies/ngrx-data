import { Observable, combineLatest, Subject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * an special observable that mantains the data inmutable
 * and you can always reset the data to the orginal value
 */
export class InmutableObservable<T> extends Observable<T>
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
                
                //shadow copy of the value
                observer.next( {...val} );
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
export const makeInmutable = () => (source: Observable<any>) => 
    {     
       return new InmutableObservable(source);
    };

