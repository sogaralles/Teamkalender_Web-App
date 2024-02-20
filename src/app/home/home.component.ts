import { Component, Input, NgModule, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
//import { DailyAppointmentComponent } from '../daily-appointment/daily-appointment.component';
import { HttpClient } from '@angular/common/http';
import { HourlyViewComponent } from '../hourly-view/hourly-view.component'; // Passe den Pfad entsprechend an


import { Injectable } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'

],
})

export class HomeComponent implements OnInit {
  todayAppointments: any;
  @Input() hours: string[] = [];
  @Input() appointments: any[] = [];
  dateValue: string = '';
  formattedDate: any;
  events:any[] = [];


  constructor(private keycloakService: KeycloakService, private http: HttpClient) { }

  ngOnInit(): void {
    const currentDate = new Date();
    console.log(currentDate);
    this.formattedDate = this.formatDate(currentDate);
    console.log(this.formattedDate);
    
  this.dateValue = this.formattedDate;
  console.log(this.dateValue);
        this.getEvents();
      
    
    this.initializeHours();
    //this.dailyAppointmentComponent.openDialog();
}

  public username() : string{
    return this.keycloakService.getUsername();
  }

  public logout(){
    this.keycloakService.logout(); //as parameter a url can be placed to be redirected to a public website
  }

  public openpopup(appointment: any) {
    appointment.show = true;
}
formatDate(currentDate: Date): string {
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const date = currentDate.getDate().toString().padStart(2, '0');
  const dayStr = `${date}.${month}.${year}`;
  return dayStr;
}

getEvents() {
  //this.http.get<any>('http://localhost:3000/events').subscribe(
  this.http.get<any>('http://193.197.231.167:3000/events').subscribe(
    (response) => {
      this.events = response.data;
      //this.logEvents();
      this.loadAppointmentsForDay();
    },
    (error) => {
      console.error('Error fetching events:', error);
    }
  );
}

initializeHours() {
  for (let hour = 0; hour < 24; hour++) {
    this.hours.push(`${hour.toString().padStart(2, '0')}:00`);
  }
}

loadAppointmentsForDay() {
  if (this.events) {
    this.appointments = this.events.filter((appointment: any) => appointment.date === this.formattedDate);
    this.markHoursInCalendar();

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
    const appointmentStartTime = new Date(`${this.formattedDate} ${appointment.startTime}`);
    const appointmentEndTime = new Date(`${this.formattedDate} ${appointment.endTime}`);

    for (let hour = appointmentStartTime.getHours(); hour <= appointmentEndTime.getHours(); hour++) {
      const hourElement = document.getElementById(`${hour.toString().padStart(2, '0')}:00`);
      if (hourElement) {
        hourElement.classList.add('marked-hour');
      }
    }
  });*/
}
public closepopup(appointment: any) {
    appointment.show = false;
}

isHourMarked(appointment: any, hour: string): boolean {
  return hour >= appointment.startTime && hour <= appointment.endTime;
}
  
}

