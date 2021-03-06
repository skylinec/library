/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {NewCategoryComponent} from "./new-category.component";

describe('NewBookComponent', () => {
  let component: NewBookComponent;
  let fixture: ComponentFixture<NewCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
