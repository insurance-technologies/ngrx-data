import { Component, OnInit } from '@angular/core';
import { DataService } from 'ngrx-data-lib';
import { UserService } from 'src/services/userService';
import { Store } from '@ngrx/store';
import { AddEntityToState } from 'projects/ngrx-data-lib/src/public_api';
import { Observable } from 'rxjs';
import { ImmutableObservable } from 'ngrx-data-lib/lib/helpers/immutable-observable';
import { User } from 'src/models/user';

@Component({
  selector: 'ngd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  title = 'ngrx-data';
  users$: ImmutableObservable<User[]>;

  constructor(private userService: UserService, private dataService: DataService, private store: Store<any>)
  {
     
  } 

  ngOnInit(): void {   

     this.users$ = this.userService.select();
     
  }

  onClick()
  {    
    this.userService.dispatch(this.dataService.GET);
  }

}
