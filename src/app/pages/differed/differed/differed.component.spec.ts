import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferedComponent } from './differed.component';

describe('DifferedComponent', () => {
  let component: DifferedComponent;
  let fixture: ComponentFixture<DifferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifferedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
