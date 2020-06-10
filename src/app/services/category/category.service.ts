import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import  globalurl  from '../../models/globalurl';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = globalurl + 'api/category';
  private subject = new BehaviorSubject<ICategory[]>([]);
  Categories$: Observable<ICategory[]> = this.subject.asObservable();

  constructor(private http:HttpClient) {
	
   }

   getCategories(){
      this.http.get(this.url).
      pipe(
        map(res => res['data'])
      )
      .subscribe(
        data => this.subject.next(data)
      );
   }

   getCategoryName(id:number){
   	return this.http.get(this.url+'/'+id);
   }

   findCategoryId(name: string) {
     return this.Categories$.pipe(
       map(categories => categories.find(data => data.name === name))
     )
   }

}
