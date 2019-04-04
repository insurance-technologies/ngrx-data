# ngrx-data

#### Manage entities in ngrx without writing boilerplate code!!
ngrx-data is a library that take care of the entity management of the state.
With easy to use functionalities as:
1. Entities Services that can be injected and has all the logic to manage the entities.
2. Fluent API to make http requests to retrive the data from external resources.
3. Support for multiple data formats.
4. Predictable and custom data mapping.
5. Built-in mutation protection.
6. Rich filtering system to retrive the data.
7. Built-in actions to make CRUD operations on the state.


## Getting Started

Follow this instructions to get a demo of a prject running ngrx-data.

### Prerequisites

TODO

### Installing

TODO

## How to use it

After you have ngrx-data installed you are ready to start using it.

### First Import the module and apply the configuration

app.module.ts

```typescript
import { NgrxDataLibModule, JsonFormatConverter, entityArrayMapper } from 'ngrx-data-lib';

//-----------------------
imports: [
    
    //Add NgrxDataLibModule.Reducer to your reducers
    StoreModule.forRoot(NgrxDataLibModule.Reducer),

    //Call the forRoot method to add the module
    NgrxDataLibModule.forRoot({      
      //converter to use to convert the body of the http requests
      deafaultRequestFormat: new JsonFormatConverter(),
      //formats supported in the responses
      deafaultResponseFormats: [new JsonFormatConverter()],
      //default data mapper to use to map the data(explained down)
      dataMapper: entityArrayMapper      
    }),
    
    //---------------------------------------
    
  ],
```

### Create the services

Create services that manage the entities in the state. When the service is first constructed, it will call the necesary actions to initialize the state.

ex: user.service.ts

```typescript
import { EntityService } from 'ngrx-data-lib'

//-------------------------------------------------------------
@Injectable({
    providedIn: 'root'
})
export class UserService extends EntityService<User> 
{
    constructor()
    {
        super('users', 'https://my-json-server.typicode.com/insurance-technologies/fake-crud-server/users');
    }
}

```

Provide in super() a unique key for the entity state and the endpoint to retrive the data related with this entity.


### Consume the services

Create services that manage the entities in the state. When the service is first constructed, it will call the necesary actions to initialize the state.

ex: app.component.ts.ts

```typescript



//---------------------------------------------------
@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  title = 'ngrx-data';
  users$: ImmutableObservable<User[]>;

  //add the service in the constructor to be injected
  constructor(private userService: UserService)
  {
     
  } 

  ngOnInit(): void {   

     //.select() will return an immutableObservable(explained down) that 
     //can be used to retrive the data subscribing to it or using the async pipe
     //in the html template( users$ | async ).
     this.users$ = this.userService.select();
     
  }
  
  onGetUsers()
  {
     //this function will make an http request to retrive the entities,
     //will save the entities in the state and the store will notify the the 
     //ImmutableObservable with the users.
     this.userService.dispatchGet();
  }

}

```

For testing you can use https://my-json-server.typicode.com/insurance-technologies/fake-crud-server/users for the user endpoint.


## Data-mapping
When sending and getting data the server has to follow a protocol in order to the client to understand it. Returning back to the configuration there is a property called dataMapper. A data mapper in ngrx-data is a function that translate the data received from the server into the correspondent actions to update the state.

```typescript
imports: [    
    //----------------------------------------
    NgrxDataLibModule.forRoot({       
      //-------------------------------------- 
      dataMapper: entityArrayMapper      
    }),
    
    //---------------------------------------
    
  ],
```

In this case (entityArrayMapper) is used, that it is a built in data mapper where the data has to follow some rules:
```json
{
    "unique name of the entity": {
        "action":[
            {
                //entity 1
            },
            {
                //entity 2
            }
        ]
    }
}
```

an example is the the endpoint used by this guide: https://my-json-server.typicode.com/insurance-technologies/fake-crud-server/users

```json
{
  "users": {
    "add": [
      {
        "id": "0",
        "name": "Alejandro",
        "lastName": "Swager"
      },
      {
        "id": "1",
        "name": "Porfirio",
        "lastName": "Jay"
      },
      {
        "id": "2",
        "name": "Martini",
        "lastName": "Bonet"
      },
      {
        "id": "3",
        "name": "Muhamed",
        "lastName": "Guardiola"
      },
      {
        "id": "4",
        "name": "Adam",
        "lastName": "Sirvi"
      }
    ]
  }
}
```

The valid actions are:
* add
* update
* delete

## Custom data mapper
It is possible to use a custom data mapper. In ngrx-data data mappers are simple typescript functions with the signature ```(data: any) : DBActions[]; ```.  
* data -> is the data recieved from the server as a javascript object
* DBActions -> is a Union of Actions to make CRUD operations in the state.

### an example of a simple data mapper:
```typescript
// expecting data to be an array of entities ( [{...}, {...}, {...}] )
// this data mapper will put those entities in the entity state posts
export function postsArrayMapper(data: any): DBActions[]
{
    return [
      new AddMany(data, 'posts')
    ];
}

//app.module
imports: [    
    //----------------------------------------
    NgrxDataLibModule.forRoot({       
      //-------------------------------------- 
      //now this data mapper can be used as the default data mapper.
      dataMapper: postsArrayMapper      
    }),    
    //---------------------------------------
    
  ],

```
The posible actions to make CRUD operations are:
```typescript
   export class AddEntityToState implements Action
{
   readonly type = ActionTypes.AddEntityToState;   
   constructor( public entity: any, public uniqueName: string ){}
}


export class AddMany implements Action
{
   readonly type = ActionTypes.AddMany;   
   constructor( public entities: any[], public uniqueName: string ){}
}


export class DeleteEntityFromState implements Action
{
   readonly type = ActionTypes.DeleteEntityFromState;   
   constructor( public id: string, public uniqueName: string ){}
}


export class DeleteAll implements Action
{
   readonly type = ActionTypes.DeleteAll;   
   constructor( public uniqueName: string ){}
}


export class DeleteMany implements Action
{
   readonly type = ActionTypes.DeleteMany;   
   constructor( public ids: string[], public uniqueName: string ){}
}


export class Update implements Action
{
   readonly type = ActionTypes.Update;   
   constructor( public entity: any, public uniqueName: string ){}
}


export class UpdateMany implements Action
{
   readonly type = ActionTypes.UpdateMany;   
   constructor( public entities: any[], public uniqueName: string ){}
}
```

## Built With

* [Ngrx](https://ngrx.io) - Reactive State for Angular
* [Ngrx-entity](https://ngrx.io/guide/entity) - small lib to create manage entities in ngrx

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

TODO

## Authors

* **All the team of Insurance Technologies**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

 ### Inspiration:  
  Ngrx is an awesome library to manage state in angular but it can be very easy to 
  not follow the best practices and at the end you end writing a lot of boilerplate code like copy and paste the name of the entities and creating
  actions for every single one, effects etc.. and you end with a really big
  state object. This library handle all the boring part for you, just concentrate
  in the business logic of your angular app.

