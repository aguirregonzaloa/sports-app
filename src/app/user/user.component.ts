import { Component, OnInit } from '@angular/core';

import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	User: IUser = null;
  isLoading = true;

  constructor(private userservice: UserService) { }

  ngOnInit() {
  	const token = localStorage.getItem('token');
  	if(token){
  	 this.userservice.getUserData(token).subscribe(data => {
        this.User = data['user'];
        this.isLoading = false;
        
      });
    }

  }


}
