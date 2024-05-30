import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferComponent } from './differ.component';

describe('DifferComponent', () => {
  let component: DifferComponent;
  let fixture: ComponentFixture<DifferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
