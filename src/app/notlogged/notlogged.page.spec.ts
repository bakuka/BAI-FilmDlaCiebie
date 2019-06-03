import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotloggedPage } from './notlogged.page';

describe('NotloggedPage', () => {
  let component: NotloggedPage;
  let fixture: ComponentFixture<NotloggedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotloggedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotloggedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
