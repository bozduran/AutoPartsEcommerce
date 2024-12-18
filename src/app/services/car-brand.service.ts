import { Injectable } from '@angular/core';
import {CarBrand} from '../common/car-brand';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl="http://localhost:8080/carBrands/search/findAllByOrderByBrandNameAsc";

  getCarBrands(pageNumber:number,
               pageSize:number):Observable<GetResponseCarBrand> {
    console.log("getCarBrands");
    return this.httpClient.get<GetResponseCarBrand>(this.baseUrl+`?page=${pageNumber}&size=${pageSize}`);

  }
}
interface GetResponseCarBrand
{
  _embedded:{
    carBrands: CarBrand[];
  }
  ,page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
