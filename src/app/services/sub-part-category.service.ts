import { Injectable } from '@angular/core';
import {SubPartCategory} from '../common/sub-part-category';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubPartCategoryService {

  baseUrl = "http://localhost:8080/api/subPartCategories";

  constructor(private httpClient: HttpClient) { }


  // -- getSubPartCategories get all main sub categories
  getSubPartCategories(mainPartCategoryId:number):Observable<SubPartCategory[]> {

    return this.httpClient.get<GetResponseSubPartCategory>(
      `${this.baseUrl}/search/getSubPartCategoriesByMainPartCategory_Id?id=${mainPartCategoryId}`)
      .pipe(
        //maps JSON data to array of MainPartCategory
        map(response => response._embedded.subPartCategories)
      );

  }
}
interface GetResponseSubPartCategory
{
  _embedded:{
    subPartCategories: SubPartCategory[];
  }
}

