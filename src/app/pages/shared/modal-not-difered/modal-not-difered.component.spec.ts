import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotDiferedComponent } from './modal-not-difered.component';

describe('ModalNotDiferedComponent', () => {
  let component: ModalNotDiferedComponent;
  let fixture: ComponentFixture<ModalNotDiferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNotDiferedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNotDiferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
