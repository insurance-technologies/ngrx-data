import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/userService';
import { ImmutableObservable } from 'ngrx-data-lib/lib/helpers/immutable-observable';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';
import { UserDomain } from 'src/models/user.domain';

@Component({
  selector: 'routing-helper',
  templateUrl: './routing-helper.component.html',
  styleUrls: ['./routing-helper.component.sass']
})
export class RoutingHelperComponent implements OnInit {
  
  users$: ImmutableObservable<UserDomain[]>;
  selectedUser$: ImmutableObservable<User>;
  isLoading$: Observable<boolean>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.selectDomainModel();    
    this.selectedUser$ = this.userService.selectSelectedEntity();
    this.isLoading$ = this.userService.selectIsLoading();
    this.onGetUsers();
  }

  
  onGetUsers() : void{
    this.userService.dispatch(this.userService.getUsers());
  }

  onReset() : void{
    this.selectedUser$.reset();
  }

  onSave(user: User) : void {        
    //this.userService.updateUser(user);         
  }


}
