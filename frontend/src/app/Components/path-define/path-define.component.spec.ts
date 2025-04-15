import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathDefineComponent } from './path-define.component';

describe('PathDefineComponent', () => {
  let component: PathDefineComponent;
  let fixture: ComponentFixture<PathDefineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathDefineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
