import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTermComponent } from './summary-term.component';

describe('SummaryTermComponent', () => {
  let component: SummaryTermComponent;
  let fixture: ComponentFixture<SummaryTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryTermComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
