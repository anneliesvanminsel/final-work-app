import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorrowComponent } from './colorrow.component';

describe('ColorrowComponent', () => {
  let component: ColorrowComponent;
  let fixture: ComponentFixture<ColorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
