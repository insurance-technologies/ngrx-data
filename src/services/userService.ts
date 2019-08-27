import { EntityService, AddEntityToState } from 'ngrx-data-lib'
import { User } from 'src/models/user';
import { Inject, Injectable } from '@angular/core';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';
import { EntityStatesCollection } from 'ngrx-data-lib/lib/state/entity-states-collection-adapter';
import { Update } from 'projects/ngrx-data-lib/src/public_api';
import { UserDomain } from 'src/models/user.domain';

@Injectable({
    providedIn: 'root'
})
export class UserService extends EntityService<User, UserDomain>
{
    constructor()
    {
        super(
            'users', 
            'https://my-json-server.typicode.com/insurance-technologies/fake-crud-server/users/', {
                domainModelFactory: u => new UserDomain(u),
                routerParamName: 'users'
            } );
    }

    add = (user: User) => this.POST.withBody(user).then( r => this.GET.at(r.id) );

    update = (user: User) => this.PUT.withBody(user).withDataMapper(null).then( resp => this.GET.at(resp.id) );

    getUsers = () => this.GET.then( y => this.GET.then( x => this.GET.then( r => this.GET ) ) );
}