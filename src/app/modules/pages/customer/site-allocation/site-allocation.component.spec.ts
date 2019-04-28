import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAllocationComponent } from './site-allocation.component';

describe('SiteAllocationComponent', () => {
  let component: SiteAllocationComponent;
  let fixture: ComponentFixture<SiteAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
