import { Component, OnInit } from '@angular/core';


import { IUser } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	User$: Observable<IUser>;

  constructor(private userservice: UserService) { }

  ngOnInit() {
  	const token = localStorage.getItem('token');
  	if(token){
  	 this.User$ = this.userservice.User$;
    }

  }


}
