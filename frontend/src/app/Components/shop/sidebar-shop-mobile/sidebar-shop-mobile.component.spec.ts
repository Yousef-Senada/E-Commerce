import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarShopMobileComponent } from './sidebar-shop-mobile.component';

describe('SidebarShopMobileComponent', () => {
  let component: SidebarShopMobileComponent;
  let fixture: ComponentFixture<SidebarShopMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarShopMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarShopMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
