import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmaterialsComponent } from './studentmaterials.component';

describe('StudentmaterialsComponent', () => {
  let component: StudentmaterialsComponent;
  let fixture: ComponentFixture<StudentmaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentmaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentmaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
