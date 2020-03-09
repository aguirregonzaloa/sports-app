import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import  globalurl  from '../../models/globalurl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
	url = globalurl + 'api/category';
  constructor(private http:HttpClient) {
	
   }

   getCategories(){
   	return this.http.get(this.url);
   }

   getCategoryName(id:number){
   	return this.http.get(this.url+'/'+id);
   }

}
