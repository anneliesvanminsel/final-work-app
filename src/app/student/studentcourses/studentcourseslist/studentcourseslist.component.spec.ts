import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcourseslistComponent } from './studentcourseslist.component';

describe('StudentcourseslistComponent', () => {
  let component: StudentcourseslistComponent;
  let fixture: ComponentFixture<StudentcourseslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentcourseslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentcourseslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
