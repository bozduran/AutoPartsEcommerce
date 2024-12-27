import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {OktaAuthModule} from '@okta/okta-angular';


//    add OktaAuthModule
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenuComponent,OktaAuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoPartEshop';

}
