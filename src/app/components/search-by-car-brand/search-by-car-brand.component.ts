import {Component, OnInit} from '@angular/core';
import {CarBrand} from '../../common/car-brand';
import {CarBrandService} from '../../services/car-brand.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf} from '@angular/common';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-search-by-car-brand',
  imports: [
    RouterLink,
    NgForOf,
    RouterLinkActive,
    MatGridList,
    MatGridTile,
    MatPaginator
  ],
  templateUrl: './search-by-car-brand.component.html',
  styleUrl: './search-by-car-brand.component.css'
})
export class SearchByCarBrandComponent implements OnInit {

  carBrands: CarBrand[]=[];
  pageNumber:number = 1;
  pageSize:number = 10;
  theTotalElements:number = 1;

  constructor(private carBrandService: CarBrandService){
  }

  ngOnInit(): void {
    this.listCarBrands()
  }

  listCarBrands(): void{
    this.carBrandService.getCarBrands(this.pageNumber-1,this.pageSize)
      .subscribe(this.processResult()
      );
  }

  processResult() {
    return (data:any)=>{
      this.carBrands = data._embedded.carBrands;
      this.pageNumber = data.page.number+1;// difference of indexing between spring and angular
      this.pageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize:string){
    this.pageSize = +pageSize;
    this.pageNumber = 0;
    this.listCarBrands();
  }

  onPageChanged(event: any) {
    if (this.pageSize!=event.pageSize){
      this.updatePageSize(event.pageSize);
    }else {
      this.pageNumber = +event.pageIndex
    }


    this.listCarBrands()
  }


}
