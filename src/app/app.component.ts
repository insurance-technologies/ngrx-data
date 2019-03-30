import { Component, OnInit } from '@angular/core';
import { DataService } from 'ngrx-data-lib';
import { UserService } from 'src/services/userService';

@Component({
  selector: 'ngd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  title = 'ngrx-data';

  constructor(private userService: UserService, private dataService: DataService)
  {

  }

  ngOnInit(): void {
    
     this.userService.dispatch(this.dataService.GET);

  }

}
