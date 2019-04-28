import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecompanyIntiationComponent } from './createcompany-intiation.component';

describe('CreatecompanyIntiationComponent', () => {
  let component: CreatecompanyIntiationComponent;
  let fixture: ComponentFixture<CreatecompanyIntiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecompanyIntiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecompanyIntiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
