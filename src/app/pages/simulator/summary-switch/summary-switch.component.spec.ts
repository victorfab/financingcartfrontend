import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySwitchComponent } from './summary-switch.component';

describe('SummarySwitchComponent', () => {
  let component: SummarySwitchComponent;
  let fixture: ComponentFixture<SummarySwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarySwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarySwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
