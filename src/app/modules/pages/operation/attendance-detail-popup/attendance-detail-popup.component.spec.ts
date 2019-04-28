import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetailPopupComponent } from './attendance-detail-popup.component';

describe('AttendanceDetailPopupComponent', () => {
  let component: AttendanceDetailPopupComponent;
  let fixture: ComponentFixture<AttendanceDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
