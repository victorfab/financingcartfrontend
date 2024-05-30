import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorSlideshowComponent } from './simulator-slideshow.component';

describe('SimulatorSlideshowComponent', () => {
  let component: SimulatorSlideshowComponent;
  let fixture: ComponentFixture<SimulatorSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorSlideshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
