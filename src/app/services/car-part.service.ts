import { Injectable } from '@angular/core';
import {CarModel} from '../common/car-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Part} from '../common/part';

@Injectable({
  providedIn: 'root'
})
export class CarPartService {

  private baseUrl= "http://localhost:8080/api/parts/search"
  private findByIdUrl=  this.baseUrl + '/findPartByCarModelId';
  private findAllPartsUrl = 'http://localhost:8080/api/parts';

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
