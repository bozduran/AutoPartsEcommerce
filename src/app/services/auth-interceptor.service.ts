import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable, SkipSelf} from '@angular/core';
import {OKTA_AUTH, OKTA_CONFIG, OktaAuthStateService} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import {from, lastValueFrom, Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})



export class AuthInterceptorService implements HttpInterceptor {


  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

    // Only add an access token for secured endpoints
    const theEndpoint = environment.autoPartsUrl + '/orders';
    const theOrderHistoryEndPoint = environment.autoPartsUrl + '/order-history';
    const securedEndpoints = [theEndpoint,theOrderHistoryEndPoint];

    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {

      // get access token
      // NEVER PUT await
      const accessToken = this.oktaAuth.getAccessToken();

      // clone the request and add new header with access token
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });

    }

    return await lastValueFrom(next.handle(request));

  }
}
