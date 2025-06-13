import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageToCarouselComponent } from './add-image-to-carousel.component';

describe('AddImageToCarouselComponent', () => {
  let component: AddImageToCarouselComponent;
  let fixture: ComponentFixture<AddImageToCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImageToCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImageToCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
