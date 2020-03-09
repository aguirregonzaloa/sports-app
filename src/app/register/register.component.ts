import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	Form: FormGroup;
	User: IUser = {id:null, name: null, surname: null, email: null, password:null};
  isRegister:boolean = false;
  error:string = null;

  constructor(private userservice: UserService) { }

  ngOnInit() {
  	 this.Form = new FormGroup({
  	 	'name': new FormControl(null,[Validators.required,
        Validators.pattern('[A-Za-z ].{3,30}')]),     
        'surname': new FormControl(null,[Validators.required,
        Validators.pattern('[A-Za-z].{3,30}')]),     
      'email': new FormControl(null, [Validators.required,
         Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      'password': new FormControl(null,[Validators.required,
        Validators.pattern('[A-Za-z0-9._%-].{3,30}')]),      
    });
  }

    onSubmit(){
    this.User.name = this.Form.get('name').value;
    this.User.surname = this.Form.get('surname').value;
    this.User.email = this.Form.get('email').value;
    this.User.password = this.Form.get('password').value;
    this.error = null;
    
	    this.userservice.registerUser(this.User)
	    .subscribe(data => {
	       this.isRegister=true;
	    },(err) => {
        this.error = 'You cannot register, try it again!';
      }
	    ,() => {
	     console.log('completed!!');
       this.error = null;
       this.Form.reset();
	    });
  }

}
