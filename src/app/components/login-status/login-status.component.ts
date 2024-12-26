import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthModule, OktaAuthStateService} from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-login-status',
  imports: [
    OktaAuthModule,
    NgIf,
    MatButton,
    RouterLink
  ],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = "";

  constructor(private oktaAuthService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }


  ngOnInit(): void {
    //    Subscribe to auth state
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );
  }

  private getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
        });
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
