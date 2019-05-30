import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountcreatedComponent } from './accountcreated.component';

describe('AccountcreatedComponent', () => {
  let component: AccountcreatedComponent;
  let fixture: ComponentFixture<AccountcreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountcreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountcreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
