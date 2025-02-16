import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {SubPartCategory} from '../../common/sub-part-category';
import {SubPartCategoryService} from '../../services/sub-part-category.service';
import {NgForOf} from '@angular/common';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
/*import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';*/



@Component({
  selector: 'app-sub-parts-menu',
  imports: [
    RouterLink,
    NgForOf,
    MatGridList,
    MatGridTile,
  ],
  templateUrl: './sub-parts-menu.component.html',
  styleUrl: './sub-parts-menu.component.css'
})
export class SubPartsMenuComponent implements OnInit {
  subPartCategories :SubPartCategory[] = [];
  currentSubPartCategoriesId: number = 1;
  previousSubPartCategoriesId: number = 1;
  searchMode: boolean = false;

  thePageNumber:number=1;
  thePageSize:number=10;
  theTotalElements:number=0;

  previousKeyWord:string="";

  //inject product service
  constructor(private route : ActivatedRoute,
              private subPartCategoryService:SubPartCategoryService) {}

  ngOnInit(): void {
    // -- load the first sub categories
    this.loadSubPartCategories();

    this.route.params.subscribe(params => {
      this.listSubPartCategories();
    })
  }

  loadSubPartCategories() {
    // -- subscribe to service to get sub part categories
    this.subPartCategoryService.getSubPartCategories(this.currentSubPartCategoriesId).subscribe(
      data=> {
        this.subPartCategories=data;
      });
  }

  private listSubPartCategories() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentSubPartCategoriesId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentSubPartCategoriesId=1;
    }


    this.previousSubPartCategoriesId = this.currentSubPartCategoriesId;
    this.subPartCategoryService.getSubPartCategories(this.currentSubPartCategoriesId)
      .subscribe(
      data=> {
        this.subPartCategories=data;
      });

  }
}
