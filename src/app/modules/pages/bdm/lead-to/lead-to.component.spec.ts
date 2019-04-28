import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadToComponent } from './lead-to.component';

describe('LeadToComponent', () => {
  let component: LeadToComponent;
  let fixture: ComponentFixture<LeadToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
