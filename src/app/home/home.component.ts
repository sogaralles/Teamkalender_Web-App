import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { HttpClient } from '@angular/common/http';

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
  events: any[] = [];


  constructor(private keycloakService: KeycloakService, private http: HttpClient) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.formattedDate = this.formatDate(currentDate);
    this.dateValue = this.formattedDate;
    this.getEvents();
    this.initializeHours();
  }
  //get Username from current user
  username(): string {
    return this.keycloakService.getUsername();
  }

  logout() {
    this.keycloakService.logout();
  }
  //format current Date to German date synatx
  formatDate(currentDate: Date): string {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');
    const dayStr = `${date}.${month}.${year}`;
    return dayStr;
  }
  //get events from backend Database
  getEvents() {
    //this.http.get<any>('http://localhost:3000/events').subscribe(
    this.http.get<any>('http://193.197.231.167:3000/events').subscribe(//muss rein bwcloud
      (response) => {
        this.events = response.data;
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
  //Filter all appointments from current date
  loadAppointmentsForDay() {
    if (this.events) {
      this.appointments = this.events.filter((appointment: any) => appointment.date === this.formattedDate);
    } else {
      console.error('No appointments found');
    }
  }

}

