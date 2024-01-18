import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { OverlayPopupComponent } from '../overlay-popup/overlay-popup.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-daily-appointment',
  templateUrl: './daily-appointment.component.html',
  styleUrls: ['./daily-appointment.component.scss']
})
export class DailyAppointmentComponent implements OnInit {
  [x: string]: any;
  dateValue: string = '';
  selectedDate: any;
  show = false;
  public appointments: any[] = [];
  events: any[] = [];
  public hours: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.selectedDate = this.formatDate(new Date(params['date']));
        this.dateValue = this.selectedDate;

        this.getEvents();
      }
    });
    this.initializeHours();
  }

  public openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });
  }

  public openpopup(appointment: any) {
    appointment.show = true;
  }

  public closepopup(appointment: any) {
    appointment.show = false;
  }

  formatDate(currentDate: Date): string {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');
    const dayStr = `${date}.${month}.${year}`;
    return dayStr;
  }

  logEvents() {
    console.log('daily-appointment_Events:', this.events);
  }


  getEvents() {
    this.http.get<any>('http://localhost:3000/events').subscribe(
      (response) => {
        this.events = response.data;
        this.logEvents();
        this.loadAppointmentsForDay();
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }


  loadAppointmentsForDay() {
    if (this.events) {
      this.appointments = this.events.filter((appointment: any) => appointment.date === this.selectedDate);
      //this.markHoursInCalendar();

      this.appointments.forEach(appointment => {
        console.log('startTime:', appointment.startTime);
        console.log('endTime:', appointment.endTime);
      });
    } else {
      console.error('No appointments found');
    }
  }


  markHoursInCalendar() {//17.01.24 entf
    /*this.appointments.forEach(appointment => {
      const appointmentStartTime = new Date(`${this.selectedDate} ${appointment.startTime}`);
      const appointmentEndTime = new Date(`${this.selectedDate} ${appointment.endTime}`);

      for (let hour = appointmentStartTime.getHours(); hour <= appointmentEndTime.getHours(); hour++) {
        const hourElement = document.getElementById(`${hour.toString().padStart(2, '0')}:00`);
        if (hourElement) {
          if (this.appointments.length > 0) {
            hourElement.classList.add('marked-hour');
          }
        }
      }
    });*/
  }


  initializeHours() {
    for (let hour = 0; hour < 24; hour++) {
      this.hours.push(`${hour.toString().padStart(2, '0')}:00`);
    }
  }


  isHourMarked(appointment: any, hour: string): boolean {
    //  return this.appointments.some(appt => hour >= appt.startTime && hour <= appt.endTime);
    return hour >= appointment.startTime && hour <= appointment.endTime;
  }

  appointmentsForHour: (hour: string) => any[] = (hour: string) => [];
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: '../overlay-popup/overlay-popup.component.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

