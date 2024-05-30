import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorCartComponent } from './simulator-cart.component';

describe('SimulatorCartComponent', () => {
  let component: SimulatorCartComponent;
  let fixture: ComponentFixture<SimulatorCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
