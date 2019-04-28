import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerDetailComponent } from './manpower-detail.component';

describe('ManpowerDetailComponent', () => {
  let component: ManpowerDetailComponent;
  let fixture: ComponentFixture<ManpowerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManpowerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
