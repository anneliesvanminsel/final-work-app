import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTeacherComponent } from './footer-teacher.component';

describe('FooterTeacherComponent', () => {
  let component: FooterTeacherComponent;
  let fixture: ComponentFixture<FooterTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
