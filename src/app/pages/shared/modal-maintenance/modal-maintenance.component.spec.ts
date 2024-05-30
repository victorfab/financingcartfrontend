import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaintenanceComponent } from './modal-maintenance.component';

describe('ModalMaintenanceComponent', () => {
  let component: ModalMaintenanceComponent;
  let fixture: ComponentFixture<ModalMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
