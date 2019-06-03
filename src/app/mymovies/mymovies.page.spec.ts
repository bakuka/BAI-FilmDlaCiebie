import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymoviesPage } from './mymovies.page';

describe('MymoviesPage', () => {
  let component: MymoviesPage;
  let fixture: ComponentFixture<MymoviesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymoviesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
