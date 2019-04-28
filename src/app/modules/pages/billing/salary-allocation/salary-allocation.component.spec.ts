import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryAllocationComponent } from './salary-allocation.component';

describe('SalaryAllocationComponent', () => {
  let component: SalaryAllocationComponent;
  let fixture: ComponentFixture<SalaryAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
