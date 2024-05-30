import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorResultComponent } from './simulator-result.component';

describe('SimulatorResultComponent', () => {
  let component: SimulatorResultComponent;
  let fixture: ComponentFixture<SimulatorResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
