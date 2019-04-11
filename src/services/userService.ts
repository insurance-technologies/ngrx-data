import { EntityService, AddEntityToState } from 'ngrx-data-lib'
import { User } from 'src/models/user';
import { Inject, Injectable } from '@angular/core';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';
import { EntityStatesCollection } from 'ngrx-data-lib/lib/state/entity-states-collection-adapter';
import { Update } from 'projects/ngrx-data-lib/src/public_api';

@Injectable({
    providedIn: 'root'
})
export class UserService extends EntityService<User> 
{
    constructor()
    {
        super('users', 'https://my-json-server.typicode.com/insurance-technologies/fake-crud-server/users/');
    }

    updateUser(user: User)
    {
        this.dispatch( this.PUT.withDataMapper( (data, uniqueName, method, dbState) => {

           return [ new Update(user, uniqueName) ];

        }));
    }

}