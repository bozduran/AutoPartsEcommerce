import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {MainPartsMenuComponent} from '../main-parts-menu/main-parts-menu.component';
import {MatIcon, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-nav-menu',
  imports: [
    RouterLinkActive,
    RouterLink,
    MainPartsMenuComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      'shoppingCart', // Name for the icon
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `src/assets/images/icons/shopping_cart.svg`),
    );

  }

}
