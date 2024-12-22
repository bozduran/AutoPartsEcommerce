import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarBrand} from '../common/car-brand';
import {CarModel} from '../common/car-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl="http://localhost:8080/api/carModels/search/getCarModelsByCarBrand_Id";

  getCarModelsByCarBrandId(pageNumber:number,
               pageSize:number,
  carBrandId:number):Observable<GetResponseCarModel> {

    return this.httpClient.get<GetResponseCarModel>(
      this.baseUrl+`?carBrandId=${carBrandId}&page=${pageNumber}&size=${pageSize}`);

  }

}

interface GetResponseCarModel
{
  _embedded:{
    carModels: CarModel[];
  }
  ,page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
