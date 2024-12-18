import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatPaginator} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {CarBrandService} from '../../services/car-brand.service';
import {CarModel} from '../../common/car-model';
import {CarModelService} from '../../services/car-model.service';

@Component({
  selector: 'app-search-by-car-model',
  imports: [
    MatGridList,
    MatGridTile,
    MatPaginator,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './search-by-car-model.component.html',
  styleUrl: './search-by-car-model.component.css'
})
export class SearchByCarModelComponent implements OnInit {

  carModels: CarModel[]=[];
  pageNumber:number = 0;
  pageSize:number = 10;
  theTotalElements:number = 1;

  currentCarBrandId:number = 0;
  previousCarBrandId:number = 0;


  constructor(private route : ActivatedRoute,
              private carModelService:CarModelService) {


  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.loadSpecificCarModels();
    })

  }

  processResult() {
    return (data:any)=>{
      this.carModels = data._embedded.carModels;
      this.pageNumber = data.page.number+1;// difference of indexing between spring and angular
      this.pageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize:string){
    this.pageSize = +pageSize;
    this.pageNumber = 0;
    this.loadCarModels();
  }

  onPageChanged(event: any) {
    if (this.pageSize!=event.pageSize){
      this.updatePageSize(event.pageSize);
    }else {
      this.pageNumber = +event.pageIndex
    }


    this.loadCarModels()
  }

  private loadCarModels() {

    this.carModelService.getCarModelsByCarBrandId(this.pageNumber-1,
      this.pageSize,
      this.currentCarBrandId).subscribe(
        this.processResult()
      );

    console.log("car length" +
      ""+this.carModels.length);
  }

  private loadSpecificCarModels() {
    // -- chek if there is id
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCarBrandId = +this.route.snapshot.paramMap.get('id')!;
    }
    console.log(this.currentCarBrandId);
    this.loadCarModels();
  }




}
