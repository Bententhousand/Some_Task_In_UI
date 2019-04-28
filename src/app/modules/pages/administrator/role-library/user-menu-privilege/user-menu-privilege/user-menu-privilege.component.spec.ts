import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuPrivilegeComponent } from './user-menu-privilege.component';

describe('UserMenuPrivilegeComponent', () => {
  let component: UserMenuPrivilegeComponent;
  let fixture: ComponentFixture<UserMenuPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
