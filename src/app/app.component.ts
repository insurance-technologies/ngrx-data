import { Component, OnInit } from '@angular/core';
import { ImmutableObservable } from 'ngrx-data-lib/lib/helpers/immutable-observable';
import { User } from 'src/models/user';
import { UserService } from 'src/services/userService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  title = 'testingLib';

  users$: ImmutableObservable<User[]>;
  selectedUser$: ImmutableObservable<User>;
  isLoading$: Observable<boolean>;

  constructor(private userService: UserService)
  {

  }

  ngOnInit(): void {    
    this.users$ = this.userService.select();    
    this.selectedUser$ = this.userService.selectSelectedEntity();
    this.isLoading$ = this.userService.selectIsLoading();
    this.onGetUsers();
  }

  onGetUsers() : void{
    this.userService.dispatch(this.userService.GET);
  }

  onReset() : void{
    this.selectedUser$.reset();
  }

  onSave(user: User) : void {        
    this.userService.updateUser(user);         
  }

  onSelect(id: string | number)
  {
    // this.userService.selectEntity(id);
  }

}
