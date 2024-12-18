import {Component, OnInit} from '@angular/core';
import {MainPartCategory} from '../../common/main-part-category';
import {MainPartCategoryService} from '../../services/main-part-category.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf} from '@angular/common';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatMenu, MatMenuItem, MatMenuPanel, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
@Component({
  selector: 'app-main-parts-menu',
  imports: [
    RouterLink,
    NgForOf,
    MatMenuTrigger,
    MatButton,
    MatMenu,
    MatMenuItem,
    RouterLinkActive
  ],
  templateUrl: './main-parts-menu.component.html',
  styleUrl: './main-parts-menu.component.css'
})

export class MainPartsMenuComponent implements OnInit {

  mainPartCategories :MainPartCategory[]=[];

  menuItems: string[] = ['Item 1', 'Item 2', 'Item 3'];

  onMenuItemClick(item: string): void {
    console.log('Clicked item:', item);
    // Add your logic here
  }

  constructor(private mainPartCategoryService:MainPartCategoryService) {
  }
  ngOnInit(): void {
    this.listOfMainPartCategories();
  }


  listOfMainPartCategories(){
    this.mainPartCategoryService.getMainPartCategories().subscribe(
      data=> {
        this.mainPartCategories=data;
      });

  }

}
