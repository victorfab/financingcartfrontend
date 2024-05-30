import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDifferComponent } from './summary-differ.component';

describe('SummaryDifferComponent', () => {
  let component: SummaryDifferComponent;
  let fixture: ComponentFixture<SummaryDifferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryDifferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryDifferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
