import { Injectable } from '@angular/core';
import {CarModel} from '../common/car-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Part} from '../common/part';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarPartService {

  private baseUrl= environment.autoPartsUrl + "/parts/search"
  private findByIdUrl=  this.baseUrl + '/findPartByCarModelId';
  private findAllPartsUrl = environment.autoPartsUrl+'/parts';
  private findBySubPartCategoryIdUrl = this.baseUrl + '/findPartBySubPartCategoryId';

  constructor(private httpClient: HttpClient) { }


  getPartByModel(pageNumber: number, pageSize: number, carModelId: number):Observable<GetResponsePart> {

    return this.httpClient.get<GetResponsePart>(
      this.findByIdUrl+`?carModelId=${carModelId}&page=${pageNumber}&size=${pageSize}`
    )

  }

  getAllCarParts(pageNumber: number, pageSize: number) {

    return this.httpClient.get<GetResponsePart>(
      this.findAllPartsUrl+`?page=${pageNumber}&size=${pageSize}`
    )

  }

  getProductById(partId: any) {

    const partUrl = this.baseUrl + `/findPartById?partId=${partId}`;

    return this.httpClient.get<Part>(partUrl);

  }

  getCarPartsBySubPartCategoryId(pageNumber: number, pageSize: number, subPartCategoryId: number){
    return this.httpClient.get<GetResponsePart>(
      this.findBySubPartCategoryIdUrl+`?subPartCategoryId=${subPartCategoryId}&page=${pageNumber}&size=${pageSize}`);

  }

}

interface GetResponsePart
{
  _embedded:{
    parts: Part[];
  }
  ,page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
