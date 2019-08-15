import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcoursedetailComponent } from './studentcoursedetail.component';

describe('StudentcoursedetailComponent', () => {
  let component: StudentcoursedetailComponent;
  let fixture: ComponentFixture<StudentcoursedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentcoursedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentcoursedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
