import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IArticle } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css']
})
export class EditarticleComponent implements OnInit {
  Articles$: Observable<IArticle[]>;
  Form: FormGroup;
  newArticle: IArticle = {name: null, description: null, price: null, category_id: null};

  constructor(private articleservice: ArticleService) { }

  ngOnInit(): void {

    this.Form = new FormGroup({
      'name': new FormControl(null,[Validators.required,
       Validators.pattern('[A-Za-z ].{3,30}')]),     
      'description': new FormControl(null,[Validators.required,
       Validators.pattern('[A-Za-z].{3,30}')]),     
      'price': new FormControl(null, [Validators.required, Validators.pattern('([0-9]*[.])?[0-9]*')]),
      'category_id': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]$')])
   });
  }

  onSubmit() {

  }

}
