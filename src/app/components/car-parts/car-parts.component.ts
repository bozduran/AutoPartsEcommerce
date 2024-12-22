import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Part} from '../../common/part';
import {CarPartService} from '../../services/car-part.service';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-car-parts',
  imports: [
    MatGridList,
    MatGridTile,
    MatPaginator,
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    MatInputModule
  ],
  templateUrl: './car-parts.component.html',
  styleUrl: './car-parts.component.css'
})
export class CarPartsComponent implements OnInit {
  parts: Part[] = [];

  carModelId: number =0;
  carBrandId: number = 0;

  pageNumber:number = 0;
  pageSize:number = 10;
  theTotalElements:number = 1;

  constructor(private route : ActivatedRoute,
              private carPartService:CarPartService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.loadCarParts();
    })

  }

  processResult() {

    return (data:any)=>{
      this.parts = data._embedded.parts;
      this.pageNumber = data.page.number+1;//   difference of indexing between spring and angular
      this.pageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };

  }

  updatePageSize(pageSize:string){
    this.pageSize = +pageSize;
    this.pageNumber = 0;
    this.getCarPartsByCarModel();
  }

  onPageChanged(event: any) {
    //    Update base on page cgange
    if (this.pageSize!=event.pageSize){
      this.updatePageSize(event.pageSize);
    }else {
      this.pageNumber = +event.pageIndex
    }

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId){
      this.getCarPartsByCarModel()
    }else {
      this.getAllParts()
    }

  }




  loadCarParts(){
    //    check if there is id
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //    Show parts for a specific car model based on id
      console.log(' loadCarParts' + this.route.snapshot.paramMap.get('id'));
      this.carModelId = +this.route.snapshot.paramMap.get('id')!;
      this.getCarPartsByCarModel();
    }else{
      //    Show all parts
      this.getAllParts();
    }
  }

  getCarPartsByCarModel(){
    //    Call service for a car model parts
    this.carPartService.getPartByModel(this.pageNumber-1,
      this.pageSize,
      this.carModelId).subscribe(
      this.processResult()
    );

  }


  getAllParts() {

    this.carPartService.getAllCarParts(this.pageNumber-1,
      this.pageSize).subscribe(
      this.processResult()
    );
  }
}
