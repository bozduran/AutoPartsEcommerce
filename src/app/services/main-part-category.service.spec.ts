import { TestBed } from '@angular/core/testing';

import { MainPartCategoryService } from './main-part-category.service';

describe('MainPartCategoryService', () => {
  let service: MainPartCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPartCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
