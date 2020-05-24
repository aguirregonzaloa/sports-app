import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from '../services/article/article.service';
import { CategoryService } from '../services/category/category.service';
import { IArticle } from '../models/article';
import { ICategory } from '../models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    Articles$: Observable<IArticle[]>;
    Categories$: Observable<ICategory[]>;
    path: string = null;
    isLoading = true;
  constructor(private articleservice: ArticleService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    // Initial in home page
     this.route.url.subscribe(data => {
        if(data[0])
        this.path = data[0].path;
     });
     this.Articles$ = this.articleservice.Article$;
     this.Articles$.subscribe(console.log);

     switch (this.path) 
     {
         case "women":
          this.Articles$ = this.articleservice.getWomenArticle();
          break;
          case "men":
            this.Articles$ = this.articleservice.getMenArticle();
          break;
          case "kids":
            this.Articles$ = this.articleservice.getKidArticle();
          break;
      }
      
      console.log(this.path);
    
  }

}
