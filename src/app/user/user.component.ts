import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/userService';
import { ImmutableObservable } from 'ngrx-data-lib/public_api';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Component({
  selector: 'ngd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  selectedUser$: ImmutableObservable<User>;
  isLoading$: Observable<boolean>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.selectedUser$ = this.userService.selectSelectedEntity();
  }

  
  onReset() : void{
    this.selectedUser$.reset();
  }

  onSave(user: User) : void {        
    this.userService.updateUser(user);         
  }


}
