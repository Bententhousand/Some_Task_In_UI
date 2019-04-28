import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMasterComponent } from './attendance-master.component';

describe('AttendanceMasterComponent', () => {
  let component: AttendanceMasterComponent;
  let fixture: ComponentFixture<AttendanceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
