import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAccountMobileComponent } from './sidebar-account-mobile.component';

describe('SidebarAccountMobileComponent', () => {
  let component: SidebarAccountMobileComponent;
  let fixture: ComponentFixture<SidebarAccountMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarAccountMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAccountMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
