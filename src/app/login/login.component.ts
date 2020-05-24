import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// import { NavMenuComponent } from '../nav-menu/nav-menu.component';

import { IUser } from '../models/user';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Form: FormGroup;
  Token: string = null;
  error:string = null;
  isLoggin:boolean = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private userservice: UserService,
              ) { }

  // regex mail = Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
  ngOnInit() {
  	 this.Form = new FormGroup({
      'email': new FormControl(null, [Validators.required,
         Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      'password': new FormControl(null,[Validators.required,
        Validators.pattern('[A-Za-z0-9._%-].{3,30}')]),      
    });
      
  }

  onSubmit(){
    const email = this.Form.get('email').value;
    const password = this.Form.get('password').value;
     this.error = null;

    this.userservice.loginUser(email,password)
    .subscribe(data => {
           localStorage.setItem("token", data['token']);

    },
    (err) => {console.log(err);
      this.error = 'Email or Password was incorrected!!!';
      this.Form.reset();
    },
    ()=>{
       const token = localStorage.getItem("token");
        this.userservice.getUserData(token);
        this.Form.reset();
       this.navigate();

        });
   
  }

   navigate() {
    this.router.navigateByUrl('/user');
  }

 
}
