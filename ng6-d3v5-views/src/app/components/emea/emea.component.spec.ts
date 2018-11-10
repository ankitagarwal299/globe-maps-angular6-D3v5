import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EMEAComponent } from './emea.component';

describe('EMEAComponent', () => {
  let component: EMEAComponent;
  let fixture: ComponentFixture<EMEAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EMEAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EMEAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
