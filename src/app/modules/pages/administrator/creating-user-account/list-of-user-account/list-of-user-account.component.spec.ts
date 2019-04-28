import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUserAccountComponent } from './list-of-user-account.component';

describe('ListOfUserAccountComponent', () => {
  let component: ListOfUserAccountComponent;
  let fixture: ComponentFixture<ListOfUserAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfUserAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
