import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuperTokenComponent } from './test-super-token.component';

describe('TestSuperTokenComponent', () => {
  let component: TestSuperTokenComponent;
  let fixture: ComponentFixture<TestSuperTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSuperTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSuperTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
