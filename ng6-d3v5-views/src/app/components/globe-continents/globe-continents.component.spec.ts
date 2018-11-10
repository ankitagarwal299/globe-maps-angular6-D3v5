import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeContinentsComponent } from './globe-continents.component';

describe('GlobeContinentsComponent', () => {
  let component: GlobeContinentsComponent;
  let fixture: ComponentFixture<GlobeContinentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobeContinentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobeContinentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
