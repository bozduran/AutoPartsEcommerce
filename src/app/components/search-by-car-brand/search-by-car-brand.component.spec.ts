import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCarBrandComponent } from './search-by-car-brand.component';

describe('SearchByCarBrandComponent', () => {
  let component: SearchByCarBrandComponent;
  let fixture: ComponentFixture<SearchByCarBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByCarBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByCarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
