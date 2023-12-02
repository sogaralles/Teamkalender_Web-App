import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAppointmentComponent } from './daily-appointment.component';

describe('DailyAppointmentComponent', () => {
  let component: DailyAppointmentComponent;
  let fixture: ComponentFixture<DailyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
