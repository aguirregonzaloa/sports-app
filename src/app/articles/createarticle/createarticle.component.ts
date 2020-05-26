import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IArticle } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {

  Articles$: Observable<IArticle[]>;
  constructor(private articleservice: ArticleService) { }

  ngOnInit(): void {
    this.Articles$ = this.articleservice.Article$;
  }

}
