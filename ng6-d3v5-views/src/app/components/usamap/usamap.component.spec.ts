import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsamapComponent } from './usamap.component';

describe('UsamapComponent', () => {
  let component: UsamapComponent;
  let fixture: ComponentFixture<UsamapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsamapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsamapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
