import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import globalurl from '../../models/globalurl';
import { BehaviorSubject } from 'rxjs';
import { IArticle } from 'src/app/models/article';
import { map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  url = globalurl + 'api/article';
  private subject = new BehaviorSubject <IArticle[]> ([]);
  Article$ = this.subject.asObservable();
  
  constructor(private http: HttpClient) { }
  
  getArticles(){
    this.http.get(this.url)
    .pipe(
       tap(data => console.log(data)),
       map(data => data['data'] )
     )
     .subscribe(articles => this.subject.next(articles));
    }
    
    getWomenArticle() {
      return this.filterArticlesByCategory(1);
    }
    getKidArticle() {
      return this.filterArticlesByCategory(2);
    }
    getMenArticle() {
      return this.filterArticlesByCategory(3);
    }
    
    filterArticlesByCategory(id: number) {
      return this.Article$
      .pipe(
        map(articles => articles.filter(article => article.category_id === id) )
      );
    }

    postArticle(article: IArticle) {
      this.http.post(this.url, article, httpOptions)
      .pipe(
        tap((val) => console.log(val)),
        map(res => res['data'])
      )
      .subscribe(data => {
        console.log('data post: ', data);
        this.addArticle(data);

      });
    }

    updateArticle(id: number, article: IArticle) {
      this.http.put(this.url + `/${id}`, article, httpOptions)
      .pipe(
        map(res => res['data'])
      )
      .subscribe(data => {
        this.editArticle(data.id, data);
      });
    }

    addArticle(article: IArticle) {
      const articles = this.subject.getValue();
      // const val = Object.assign({}, article); /* Create a new value without reference */
      const addarticles = [...articles, article];
      this.subject.next(addarticles);
    }

    editArticle(artID: number, article: IArticle) {
      const articles = this.subject.getValue();
      const indexId = articles.findIndex(data => data.id === artID);
      const newarticles = [...articles]; // clone the array
      newarticles[indexId] = article;
      this.subject.next(newarticles);
    }


}
