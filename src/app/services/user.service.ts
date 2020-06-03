import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
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
  loginurl = globalurl + 'api/login';
  logouturl = globalurl + 'api/logout';
  registerurl = globalurl + 'api/register';
  userurl = globalurl + 'api/userdata';
  private subject = new BehaviorSubject<IUser>(null);
  User$: Observable<IUser> = this.subject.asObservable();
  login = new BehaviorSubject<boolean>(false);
  token = new BehaviorSubject<string>(' ');

  constructor(private http:HttpClient) { }
  

  loginUser(email:string, password:string): Observable<string> {
  	const body = {email: email, password: password};
  	 
     return this.http.post<string>(this.loginurl, body, httpOptions);
  }

  registerUser(user:IUser) {
  	 const body = {
       name: user.name,
       surname: user.surname,
       email: user.email,
       password: user.password
     }

  	return this.http.post(this.registerurl, body, httpOptions);
  }

    getUserData(token: string) {
      const body = {token: token}
      this.http.post<IUser>(this.userurl, body, httpOptions)
      .pipe(
        tap(val => console.log(val)),
        map(res => res['user'])
      )
      .subscribe( user =>{
      this.subject.next(user);
      this.login.next(true);
      this.token.next(token);},
      (errors)=>{
        localStorage.removeItem('token');
        this.token.next(null);
      });
    }

    logoutUser(token:string){
      const body = {token: token};
      this.http.post(this.logouturl, body, httpOptions)
      .subscribe(() => {
        this.subject.next(null);
        this.login.next(false);
        this.token.next(null);
      });
    }
}
