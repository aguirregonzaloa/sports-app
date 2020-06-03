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

  subscriptionLogin: Subscription; 
  subscriptionToken: Subscription; 
  User$: Observable<IUser>;
  Categories$: Observable<ICategory[]>;
  User: IUser = null;
  token: string = null;
  isLogin = false;

  constructor(private userservice: UserService,
              private categoryservice: CategoryService) {}

  ngOnInit() {

    this.subscriptionLogin = this.userservice.login.subscribe(data => {
      this.isLogin = data;
    });

    this.subscriptionToken = this.userservice.token.subscribe(data => {
      this.token = data;
    }); // End SubscriptionToken

    this.User$ = this.userservice.User$;
         // this.User$.subscribe(console.log);
    this.Categories$ = this.categoryservice.Categories;
    this.Categories$.subscribe(console.log);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
    this.subscriptionToken.unsubscribe();
  }

  logout() {
    this.userservice.logoutUser(this.token)
  }

}
