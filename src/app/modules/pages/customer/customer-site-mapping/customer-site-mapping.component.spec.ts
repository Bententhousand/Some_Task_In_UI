import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteMappingComponent } from './customer-site-mapping.component';

describe('CustomerSiteMappingComponent', () => {
  let component: CustomerSiteMappingComponent;
  let fixture: ComponentFixture<CustomerSiteMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
