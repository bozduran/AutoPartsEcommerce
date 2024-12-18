import { TestBed } from '@angular/core/testing';

import { SubPartCategoryService } from './sub-part-category.service';

describe('SubPartCategoryService', () => {
  let service: SubPartCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubPartCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
