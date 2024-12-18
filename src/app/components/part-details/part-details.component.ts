import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CarPartService} from '../../services/car-part.service';
import {Part} from '../../common/part';

@Component({
  selector: 'app-part-details',
  imports: [],
  templateUrl: './part-details.component.html',
  styleUrl: './part-details.component.css'
})
export class PartDetailsComponent implements OnInit {

  part: Part= new Part();

  constructor(private route: ActivatedRoute,private partService:CarPartService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listPartDetails();
    })
  }

  private listPartDetails() {
    const partId = this.route.snapshot.params['id'];

    this.partService.getProductById(partId).subscribe(
      data => {
        this.part = data;
      }
    )
    console.log(partId ," ",
      this.part.id);

  }
}
