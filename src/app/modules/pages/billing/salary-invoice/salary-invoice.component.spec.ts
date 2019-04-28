import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryInvoiceComponent } from './salary-invoice.component';

describe('SalaryInvoiceComponent', () => {
  let component: SalaryInvoiceComponent;
  let fixture: ComponentFixture<SalaryInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
