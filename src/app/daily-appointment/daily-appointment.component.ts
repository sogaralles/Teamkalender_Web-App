import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-daily-appointment',
  templateUrl: './daily-appointment.component.html',
  styleUrls: ['./daily-appointment.component.scss']
})
export class DailyAppointmentComponent implements OnInit {
[x: string]: any;
  dateValue: string = '';
  selectedDate: any;
  
  appointments: any[] = [];
  events: any[] = [];
  hours: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {  

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
      this.markHoursInCalendar();

      this.appointments.forEach(appointment => {
        console.log('startTime:', appointment.startTime);
        console.log('endTime:', appointment.endTime);
      });
    } else {
      console.error('No appointments found');
    }
  }      
  

  markHoursInCalendar() {
    this.appointments.forEach(appointment => {
      const appointmentStartTime = new Date(`${this.selectedDate} ${appointment.startTime}`);
      const appointmentEndTime = new Date(`${this.selectedDate} ${appointment.endTime}`);

      for (let hour = appointmentStartTime.getHours(); hour <= appointmentEndTime.getHours(); hour++) {
        const hourElement = document.getElementById(`${hour.toString().padStart(2, '0')}:00`);
        if (hourElement) {
          hourElement.classList.add('marked-hour');
        }
      }
    });
  }

  initializeHours() {
    for (let hour = 0; hour < 24; hour++) {
      this.hours.push(`${hour.toString().padStart(2, '0')}:00`);
    }
  }


  isHourMarked(appointment: any, hour: string): boolean {
    return hour >= appointment.startTime && hour <= appointment.endTime;
  }
}
