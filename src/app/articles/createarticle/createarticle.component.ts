import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';


import { IArticle } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { mergeMap, concatMap, merge, tap } from 'rxjs/operators';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {

  Articles$: Observable<IArticle[]>;
  Form: FormGroup;
  newArticle: IArticle = {name: null, description: null, price: null, category_id: null};

  constructor(private articleservice: ArticleService) { }

  ngOnInit(): void {
    this.Articles$ = this.articleservice.Article$;

    this.Form = new FormGroup({
      'name': new FormControl(null,[Validators.required,
       Validators.pattern('[A-Za-z ].{3,30}')]),     
       'description': new FormControl(null,[Validators.required,
       Validators.pattern('[A-Za-z].{3,30}')]),     
     'price': new FormControl(null, [Validators.required]),
     'category_id': new FormControl(null, Validators.required)
          
   });
  }

  onSubmit(){
    this.newArticle.name = this.Form.value.name;
    this.newArticle.description = this.Form.value.description;
    this.newArticle.price = this.Form.value.price;
    this.newArticle.category_id = this.Form.value.category_id;
    console.log(this.newArticle);
    this.articleservice.addArticle(this.newArticle);
    this.Form.reset();
  }

}
