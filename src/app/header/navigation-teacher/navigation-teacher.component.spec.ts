import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTeacherComponent } from './navigation-teacher.component';

describe('NavigationTeacherComponent', () => {
  let component: NavigationTeacherComponent;
  let fixture: ComponentFixture<NavigationTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
