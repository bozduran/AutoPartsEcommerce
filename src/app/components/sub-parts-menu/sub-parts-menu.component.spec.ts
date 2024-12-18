import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPartsMenuComponent } from './sub-parts-menu.component';

describe('SubPartsMenuComponent', () => {
  let component: SubPartsMenuComponent;
  let fixture: ComponentFixture<SubPartsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubPartsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubPartsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
