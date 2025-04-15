import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartBarComponent } from './product-cart-bar.component';

describe('ProductCartBarComponent', () => {
  let component: ProductCartBarComponent;
  let fixture: ComponentFixture<ProductCartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCartBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
