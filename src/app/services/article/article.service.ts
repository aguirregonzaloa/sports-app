import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import  globalurl  from '../../models/globalurl';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

	url = globalurl + 'api/article';
  constructor(private http:HttpClient) { }

  getArticles(){
  	return this.http.get(this.url);
  }

  getArticlesByCategory(id:number){
  	return this.http.get(this.url+'/'+id);
  }


}
