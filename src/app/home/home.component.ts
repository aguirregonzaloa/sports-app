import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from '../services/article/article.service';
import { CategoryService } from '../services/category/category.service';
import { IArticle } from '../models/article';
import { ICategory } from '../models/category';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    // this.Articles$ = this.articleservice.Article$;

     this.route.params
     .pipe(tap(v => console.log('params',v)))
     .subscribe(data => {
      this.path = data['id']
      this.Articles$ = this.articleservice.filterArticlebyCategoryname(this.path);
      });

      
    this.Articles$.subscribe((data) => {
      if(data.length>0)
      this.isLoading = false; 
    });

    console.log(this.path);
    
  }

}
