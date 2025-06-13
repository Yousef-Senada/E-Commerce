import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarShopElementComponent } from './sidebar-shop-element.component';

describe('SidebarShopElementComponent', () => {
  let component: SidebarShopElementComponent;
  let fixture: ComponentFixture<SidebarShopElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarShopElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarShopElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
