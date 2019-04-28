import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuPrivilegeComponent } from './role-menu-privilege.component';

describe('RoleMenuPrivilegeComponent', () => {
  let component: RoleMenuPrivilegeComponent;
  let fixture: ComponentFixture<RoleMenuPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMenuPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenuPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
