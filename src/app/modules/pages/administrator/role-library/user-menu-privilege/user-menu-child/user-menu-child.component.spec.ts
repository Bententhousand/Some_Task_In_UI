import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuChildComponent } from './user-menu-child.component';

describe('UserMenuChildComponent', () => {
  let component: UserMenuChildComponent;
  let fixture: ComponentFixture<UserMenuChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
