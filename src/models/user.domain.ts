import { User } from './user';



export class UserDomain {

    private user: User;

    get id() { return this.user.id; }

    get name() { return this.user.name; }

    get lastName() { return this.user.lastName; }

    get fullName() { return this.name + this.lastName; }

    constructor(user: User) {
        this.user = user;
    }

}
