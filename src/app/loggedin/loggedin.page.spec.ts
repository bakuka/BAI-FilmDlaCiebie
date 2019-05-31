import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinPage } from './loggedin.page';

describe('LoggedinPage', () => {
  let component: LoggedinPage;
  let fixture: ComponentFixture<LoggedinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
