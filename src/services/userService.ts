import { EntityService } from 'ngrx-data-lib'
import { User } from 'src/models/user';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService extends EntityService<User> 
{
    constructor()
    {
        super('users', 'http://localhost:3000/users');
    }
}