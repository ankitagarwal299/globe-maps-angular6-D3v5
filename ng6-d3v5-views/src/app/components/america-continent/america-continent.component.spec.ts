import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmericaContinentComponent } from './america-continent.component';

describe('AmericaContinentComponent', () => {
  let component: AmericaContinentComponent;
  let fixture: ComponentFixture<AmericaContinentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmericaContinentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmericaContinentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
