import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFilterSliderComponent } from './price-filter-slider.component';

describe('PriceFilterSliderComponent', () => {
  let component: PriceFilterSliderComponent;
  let fixture: ComponentFixture<PriceFilterSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceFilterSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceFilterSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
