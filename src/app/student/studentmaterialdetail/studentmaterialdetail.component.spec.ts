import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmaterialdetailComponent } from './studentmaterialdetail.component';

describe('StudentmaterialdetailComponent', () => {
  let component: StudentmaterialdetailComponent;
  let fixture: ComponentFixture<StudentmaterialdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentmaterialdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentmaterialdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
