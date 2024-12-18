import { TestBed } from '@angular/core/testing';

import { CarPartService } from './car-part.service';

describe('CarPartService', () => {
  let service: CarPartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarPartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
