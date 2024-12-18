import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPartsMenuComponent } from './main-parts-menu.component';

describe('MainPartsMenuComponent', () => {
  let component: MainPartsMenuComponent;
  let fixture: ComponentFixture<MainPartsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPartsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPartsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
