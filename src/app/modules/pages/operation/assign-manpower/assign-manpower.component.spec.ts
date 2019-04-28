import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignManpowerComponent } from './assign-manpower.component';

describe('AssignManpowerComponent', () => {
  let component: AssignManpowerComponent;
  let fixture: ComponentFixture<AssignManpowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignManpowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignManpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
