import { Injectable } from '@angular/core';
import {CarBrand} from '../common/car-brand';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl= environment.autoPartsUrl+"/carBrands/search/findAllByOrderByBrandNameAsc";

  getCarBrands(pageNumber:number,
               pageSize:number):Observable<GetResponseCarBrand> {

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
