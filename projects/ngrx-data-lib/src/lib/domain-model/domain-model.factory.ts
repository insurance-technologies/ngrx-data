import { Observable } from 'rxjs';



export type IDomainModelFactory<I, T> = (plainObj: I) => T;

