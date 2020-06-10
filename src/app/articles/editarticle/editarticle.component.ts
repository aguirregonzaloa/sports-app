import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IArticle } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css']
})
export class EditarticleComponent implements OnInit {
  Article$: Observable<IArticle>;
  Form: FormGroup;
  editArticle: IArticle = {id: null, name: null, description: null, price: null, category_id: null};

  constructor(private articleservice: ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const artId = +this.route.snapshot.params.id;
    this.editArticle.id = artId;
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
    if(this.Form.invalid) {
      return;
    }

    this.editArticle.name = this.Form.value.name;
    this.editArticle.description = this.Form.value.description;
    this.editArticle.price = this.Form.value.price;
    this.editArticle.category_id = this.Form.value.category_id;
    this.articleservice.updateArticle(this.editArticle.id, this.editArticle);
  }

  onBack() {
    this.router.navigate(['/createarticle']);
  }

}
