import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRequest } from 'ngrx-data-lib';
import { JsonFormatConverter } from 'ngrx-data-lib';

@Component({
  selector: 'ngd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  title = 'ngrx-data';

  constructor(private http: HttpClient)
  {

  }

  ngOnInit(): void {
    
    getRequest(this.http, 'https://reqres.in/api/users', [new JsonFormatConverter()]).subscribe(data=>{
      console.log(data);
    })

  }

}
