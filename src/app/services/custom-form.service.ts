import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {State} from '../common/state';
import {Country} from '../common/country';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomFormService {

  private countriesUrl = "http://localhost:8080/api/countries";
  private stateUrl="http://localhost:8080/api/states"

  constructor(private httpClient: HttpClient) { }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries),
    );

  }

  getStates(theCountry:string):Observable<State[]>{

    const searchStatesUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountry}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states),
    );

  }

  getMothForCreditCard(startingMonth:number):Observable<number[]> {
    let data:number[] = [];

    for(let theMonth=startingMonth; theMonth<=12;theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }

  getYearsForCreditCard():Observable<number[]> {
    let data:number[] = [];

    const currentYear:number = new Date().getFullYear();
    const lastYear:number = currentYear+10;

    for(let theYear= currentYear; theYear<=lastYear;theYear++){
      data.push(theYear);
    }

    return of(data);
  }

}

interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}

