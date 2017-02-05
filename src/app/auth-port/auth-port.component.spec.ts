/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AuthPortComponent} from './auth-port.component';

describe('AuthPortComponent', () => {
  let component: AuthPortComponent;
  let fixture: ComponentFixture<AuthPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPortComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
