import { Component, OnInit } from '@angular/core';
import { ImmutableObservable } from 'ngrx-data-lib/lib/helpers/immutable-observable';
import { User } from 'src/models/user';
import { UserService } from 'src/services/userService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  title = 'testingLib';

  users$: ImmutableObservable<User[]>;

  constructor(private userService: UserService)
  {

  }

  ngOnInit(): void {    
    this.users$ = this.userService.select();    
  }

  onGetUsers() : void{
    this.userService.dispatch(this.userService.GET);
  }

  onReset() : void{
    this.users$.reset();
  }

  onSave(user: User) : void {    
    
    this.userService.updateUser(user);
         
  }

}
