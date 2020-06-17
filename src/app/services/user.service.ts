import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, throwError } from 'rxjs';
import { map, take, tap, exhaustMap, catchError } from 'rxjs/operators';

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
  
  errorsubject = new BehaviorSubject<string>('');
  isRegister = new BehaviorSubject<string>('');
  Error$: Observable<string> = this.errorsubject.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  loginUser(email:string, password:string) {
    const body = {email,  password};

    this.http.post<string>(this.loginurl, body, httpOptions)
      .pipe(
        map(res => res['token']),
        catchError(error=>this.handleErrors(error))
      )
      .subscribe(
        token => {
          localStorage.setItem('token', token);
          this.loginsubject.next(true);
        },
        (error) => this.errorsubject.next(error),
        () => {
          const token = localStorage.getItem('token');
          this.getUserData(token);
          this.router.navigate(['/']);
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

  	 this.http.post(this.registerurl, body, httpOptions)
     .pipe(
       catchError(error => this.handleErrors(error))
     ).subscribe(data => {
         console.log(data);
         this.isRegister.next('You registered successfully!!!');
      },(err) => {
        this.errorsubject.next(err);
      }
      ,() => {
       this.errorsubject.next(null);
       setTimeout(()=>{this.isRegister.next(null)},2000);
      });;
  }

    getUserData(token: string) {
      const body = { token };
      this.http.post<IUser>(this.userurl, body, httpOptions)
      .pipe(
        map(res => res['user']),
        catchError(error=>this.handleErrors(error))
      )
      .subscribe( user =>{
      this.subject.next(user);
      this.loginsubject.next(true);
      },
      (errors) => {
        localStorage.removeItem('token');
      });
    }

    logoutUser(){
      const body = {token: localStorage.getItem('token')};
      this.http.post(this.logouturl, body, httpOptions)
      .subscribe(() => {
        this.subject.next(null);
        this.loginsubject.next(false);
        localStorage.removeItem('token');
      });
    }

    handleErrors(errors: any){
      const {error} = errors;
      return throwError(error.message);
    }
}
