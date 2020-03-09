import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, take, tap, exhaustMap } from 'rxjs/operators';

import { IUser } from '../models/user';
import  globalurl  from '../models/globalurl';

// let headers = new HttpHeaders().set('Content-Type','text');
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
})
};

@Injectable({
  providedIn: 'root'
})

// https://jsonplaceholder.typicode.com/users
export class UserService {
	loginurl = globalurl+'api/login';
  logouturl = globalurl+'api/logout';
	registerurl = globalurl+'api/register';
	userurl = globalurl+'api/userdata';
  User = new Subject<IUser>();
  login = new Subject<boolean>();
  token = new Subject<string>();

  constructor(private http:HttpClient) { }
  

  loginUser(email:string, password:string):Observable<string>{
  	const body = {email: email, password: password}
  	 
     return this.http.post<string>(this.loginurl, body, httpOptions);
  }

  registerUser(user:IUser){
  	 const body = {
       name: user.name,
       surname:user.surname,
       email: user.email, 
       password: user.password
     }

  	return this.http.post(this.registerurl, body, httpOptions);
  }

    getUserData(token:string): Observable<IUser>{
  	const body = {token: token}
  	return this.http.post<IUser>(this.userurl, body, httpOptions)
    .pipe(tap(resUser=>{
      this.User.next(resUser['user']);
      this.login.next(true);
      this.token.next(token);
    }));
    }

    logoutUser(token:string){
    const body = {token: token}
    return this.http.post(this.logouturl, body, httpOptions)
    .pipe(tap(res=>{
      this.User.next(null);
      this.login.next(false);
      this.token.next(null);
    }));
    }
}
