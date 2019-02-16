import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsDetailComponent } from './materials-detail.component';

describe('MaterialsDetailComponent', () => {
  let component: MaterialsDetailComponent;
  let fixture: ComponentFixture<MaterialsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
