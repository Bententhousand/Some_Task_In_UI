import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFieldOfficerComponent } from './assign-field-officer.component';

describe('AssignFieldOfficerComponent', () => {
  let component: AssignFieldOfficerComponent;
  let fixture: ComponentFixture<AssignFieldOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFieldOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFieldOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
