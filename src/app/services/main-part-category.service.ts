import { Injectable } from '@angular/core';
import {MainPartCategory} from '../common/main-part-category';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainPartCategoryService {

  // -- inject HttpClient
  constructor(private httpClient: HttpClient) { }

  private baseUrl = "http://localhost:8080/api/mainPartCategories";

  // -- getMainPartCategories get all main part categories
  getMainPartCategories():Observable<MainPartCategory[]> {
    return this.httpClient.get<GetResponseMainPartCategory>(this.baseUrl).pipe(
      //maps JSON data to array of MainPartCategory
      map(response => response._embedded.mainPartCategories)
    );

  }



}

interface GetResponseMainPartCategory
{
  _embedded:{
    mainPartCategories: MainPartCategory[];
  }
}
