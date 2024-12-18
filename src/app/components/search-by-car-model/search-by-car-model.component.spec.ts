import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCarModelComponent } from './search-by-car-model.component';

describe('SearchByCarModelComponent', () => {
  let component: SearchByCarModelComponent;
  let fixture: ComponentFixture<SearchByCarModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByCarModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByCarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
