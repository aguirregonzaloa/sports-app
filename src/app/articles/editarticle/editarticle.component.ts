import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IArticle } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css']
})
export class EditarticleComponent implements OnInit {
  Article$: Observable<IArticle>;
  Form: FormGroup;
  newArticle: IArticle = {name: null, description: null, price: null, category_id: null};

  constructor(private articleservice: ArticleService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const artId = +this.route.snapshot.params.id;
    console.log(artId);
    this.Article$ = this.articleservice.getArticle(artId);
    
    this.Form = new FormGroup({
                'name': new FormControl(null,[Validators.required,
                Validators.pattern('[A-Za-z ].{3,30}')]),     
                'description': new FormControl(null,[Validators.required,
                Validators.pattern('[A-Za-z].{3,30}')]),     
                'price': new FormControl(null, [Validators.required, Validators.pattern('([0-9]*[.])?[0-9]*')]),
                'category_id': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]$')])
                });
  
    this.Article$.subscribe(data => {
      // console.log(data);
      if(data !== undefined){
      this.Form.setValue({name: data.name, description: data.description, price: data.price, category_id: data.category_id});
      }
    });
  
  }

  onSubmit() {

  }

}
