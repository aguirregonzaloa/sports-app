import { Component, OnInit, OnDestroy , OnChanges } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { Observable, Subscription } from 'rxjs';
import { map, take, tap, delay } from 'rxjs/operators';
import {NgForm} from '@angular/forms';

import { IUser } from '../models/user';
import { UserService } from '../services/user.service';
import { ICategory } from '../models/category';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  User$: Observable<IUser>;
  Categories$: Observable<ICategory[]>;
  User: IUser = null;
  token: string = null;
  isLogin = false;

  constructor(private userservice: UserService,
              private categoryservice: CategoryService) {}

  ngOnInit() {

    this.User$ = this.userservice.User$;
    this.userservice.Login$.subscribe(data => this.isLogin = data);
    this.userservice.Token$.subscribe(data => this.token = data);
         // this.User$.subscribe(console.log);
    this.Categories$ = this.categoryservice.Categories$;
    this.Categories$.subscribe(console.log);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {

  }

  logout() {
    this.userservice.logoutUser(this.token);
  }

}
