import { Component, OnInit } from '@angular/core';

import { IUser } from './models/user';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sports-app';
  constructor(private userservice: UserService){}
  
  ngOnInit(){
  	const token = localStorage.getItem("token");
        this.userservice.getUserData(token).subscribe();
  }
}
