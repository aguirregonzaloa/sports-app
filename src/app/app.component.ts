import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';
import { ArticleService } from './services/article/article.service';
import { CategoryService } from './services/category/category.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sports-app';
  constructor(private userservice: UserService,
              private articleservice: ArticleService,
              private categoryservice: CategoryService) {}
  
  ngOnInit(){
    this.articleservice.getArticles();

    const token = localStorage.getItem("token");
    if(token)
    this.userservice.getUserData(token);

    this.categoryservice.getCategories();
  }
}
