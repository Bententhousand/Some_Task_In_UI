import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuChildComponent } from './role-menu-child.component';

describe('RoleMenuChildComponent', () => {
  let component: RoleMenuChildComponent;
  let fixture: ComponentFixture<RoleMenuChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMenuChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenuChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
