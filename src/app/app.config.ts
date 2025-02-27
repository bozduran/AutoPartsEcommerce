import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http'; // Import for HTTP

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
  OktaAuthStateService, OktaAuthGuard
} from '@okta/okta-angular';

import {OktaAuth} from '@okta/okta-auth-js';

import autoPartsConfig from './config/autoPartsConfig';
import {AuthInterceptorService} from './services/auth-interceptor.service';


const oktaConfig = autoPartsConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

export const appConfig: ApplicationConfig = {

  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {provide:
      HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi: true},
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync('noop'),
    provideAnimationsAsync(),
    //    get okta providers
    importProvidersFrom(OktaAuthModule),
    {provide:
      OKTA_CONFIG,
      useValue: {oktaAuth}},

  ]

};
