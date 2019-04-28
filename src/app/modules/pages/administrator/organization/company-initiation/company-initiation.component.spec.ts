import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInitiationComponent } from './company-initiation.component';

describe('CompanyInitiationComponent', () => {
  let component: CompanyInitiationComponent;
  let fixture: ComponentFixture<CompanyInitiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInitiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
