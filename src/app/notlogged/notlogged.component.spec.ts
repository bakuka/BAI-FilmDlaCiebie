import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotloggedComponent } from './notlogged.component';

describe('NotloggedComponent', () => {
  let component: NotloggedComponent;
  let fixture: ComponentFixture<NotloggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotloggedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
