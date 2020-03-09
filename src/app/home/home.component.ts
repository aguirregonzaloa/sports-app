import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { User } from '../models/user';
// import { UserService } from '../services/user.service';

import { ArticleService } from '../services/article/article.service';
import { CategoryService } from '../services/category/category.service';
import { IArticle } from '../models/article';
import { ICategory } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

 
export class HomeComponent implements OnInit {
	// users: User[];
    articles: IArticle[];
    categories: ICategory[];
    path: string = null;
    isLoading = true;
  constructor(private articleservice: ArticleService,
              private categoryService:CategoryService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    // Initial in home page
     this.route.url.subscribe(data => {
        if(data[0])
        this.path = data[0].path;
     });

      this.categoryService.getCategories().subscribe(data=> {
            this.categories = data['data'];
            //console.log(this.categories);
          },
          err =>console.log(err), 
          () => {

                 if(this.path){
                   let id: any;
                     switch (this.path) {
                       case "women":
                         id = this.categories[0].id;
                         break;
                       case "men":
                         id = this.categories[1].id;
                         break;
                       case "kids":
                         id = this.categories[2].id;
                         break;
                     }
                    // get the pathname to show just one category
                    this.articleservice.getArticlesByCategory(id).subscribe(data =>{
                     this.articles = data['data'];
                         this.isLoading = false;
                      }, (error)=>{
                        console.log(error);
                        this.isLoading = false;
                      });// End subcribe

                   }else{

                      this.articleservice.getArticles().subscribe((data)=>{
                         this.articles = data['data'];
                         this.isLoading = false;
                      }, (error)=>{
                        console.log(error);
                        this.isLoading = false;
                      }); // End Subscribe
                   
                   }// end else  
     });// End category subscribe;
      
       console.log(this.path);
    
  }

}
