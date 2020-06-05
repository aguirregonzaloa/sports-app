import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, take, tap, exhaustMap } from 'rxjs/operators';

import { IUser } from '../models/user';
import globalurl from '../models/globalurl';
import { Router } from '@angular/router';

// let headers = new HttpHeaders().set('Content-Type','text');
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
})
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loginurl = globalurl + 'api/login';
  logouturl = globalurl + 'api/logout';
  registerurl = globalurl + 'api/register';
  userurl = globalurl + 'api/userdata';
  private subject = new BehaviorSubject<IUser>(null);
  User$: Observable<IUser> = this.subject.asObservable();
  private loginsubject = new BehaviorSubject<boolean>(false);
  Login$: Observable<boolean> = this.loginsubject.asObservable();
  private tokensubject = new BehaviorSubject<string>(' ');
  Token$: Observable<string> = this.tokensubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(email:string, password:string) {
    const body = {email,  password};

    this.http.post<string>(this.loginurl, body, httpOptions)
      .pipe(
        map(res => res['token'])
      )
      .subscribe(
        token => localStorage.setItem('token', token),
        (errors) => console.log(errors),
        () => {
          const token = localStorage.getItem('token');
          this.getUserData(token);
        }
      );

  }

  registerUser(user: IUser) {
  	 const body = {
       name: user.name,
       surname: user.surname,
       email: user.email,
       password: user.password
     }

  	 return this.http.post(this.registerurl, body, httpOptions);
  }

    getUserData(token: string) {
      const body = { token };
      this.http.post<IUser>(this.userurl, body, httpOptions)
      .pipe(
        tap(val => console.log(val)),
        map(res => res['user'])
      )
      .subscribe( user =>{
      this.subject.next(user);
      this.loginsubject.next(true);
      this.tokensubject.next(token);
      },
      (errors) => {
        localStorage.removeItem('token');
        this.tokensubject.next(null);
      });
    }

    logoutUser(token: string){
      const body = {token};
      this.http.post(this.logouturl, body, httpOptions)
      .subscribe(() => {
        this.subject.next(null);
        this.loginsubject.next(false);
        this.tokensubject.next(null);
        localStorage.removeItem('token');
      });
    }
}
