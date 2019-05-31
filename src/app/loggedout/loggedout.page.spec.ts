import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedoutPage } from './loggedout.page';

describe('LoggedoutPage', () => {
  let component: LoggedoutPage;
  let fixture: ComponentFixture<LoggedoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
