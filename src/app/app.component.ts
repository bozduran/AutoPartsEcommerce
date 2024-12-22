import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainPartsMenuComponent} from './components/main-parts-menu/main-parts-menu.component';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoPartEshop';

}
