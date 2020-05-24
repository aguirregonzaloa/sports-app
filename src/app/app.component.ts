import { Component, OnInit } from '@angular/core';

import { IUser } from './models/user';
import { UserService } from './services/user.service';
import { ArticleService } from './services/article/article.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sports-app';
  constructor(private userservice: UserService,
    private articleservice: ArticleService){}
  
  ngOnInit(){
    this.articleservice.getArticles();
  	const token = localStorage.getItem("token");
        this.userservice.getUserData(token);
  }
}
