import { TestBed } from '@angular/core/testing';

import { CarBrandService } from './car-brand.service';

describe('CarBrandService', () => {
  let service: CarBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
