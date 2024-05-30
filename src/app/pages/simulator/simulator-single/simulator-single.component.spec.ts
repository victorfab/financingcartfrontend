import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorSingleComponent } from './simulator-single.component';

describe('SimulatorSingleComponent', () => {
  let component: SimulatorSingleComponent;
  let fixture: ComponentFixture<SimulatorSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
