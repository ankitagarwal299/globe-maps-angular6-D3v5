import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APACComponent } from './apac.component';

describe('APACComponent', () => {
  let component: APACComponent;
  let fixture: ComponentFixture<APACComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APACComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
