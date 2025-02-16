import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthModule} from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import autoPartsConfig from '../../config/autoPartsConfig';



@Component({
  selector: 'app-login',
  imports: [OktaAuthModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  oktaSigning: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    //    need declaration file src/okta-signing-widget.d.ts


    this.oktaSigning = new OktaSignIn({
      logo: 'logo-signin.png', //   added to public with favico
      baseUrl: autoPartsConfig.oidc.issuer.split('/oauth2')[0],      //    load parameters from config file
      clientId: autoPartsConfig.oidc.clientId,
      redirectUri: autoPartsConfig.oidc.redirectUri,
      useClassicEngine: true,

      authParams: {
        pkcs: true,  //    must have !!!!
        issuer: autoPartsConfig.oidc.issuer,
        scopes: autoPartsConfig.oidc.scopes
      },
      features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
        registration: true // REQUIRED
      }

    });
  }

  ngOnInit() {
    this.oktaSigning.remove();

    this.oktaSigning.renderEl({
        el: '#okta-sign-in-widget'  //    same as the html div class
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    )
  }
}
