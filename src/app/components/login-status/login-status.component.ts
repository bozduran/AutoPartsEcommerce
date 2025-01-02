import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-login-status',
  imports: [
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

  storage:Storage=sessionStorage

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

          //    store user email so we can retrive history of orders
          this.storage.setItem('userEmail', res.email as string);
          console.log(this.storage.getItem('userEmail'));

        });
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
