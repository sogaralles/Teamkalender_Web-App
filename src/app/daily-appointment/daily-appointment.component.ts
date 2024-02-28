import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


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

  constructor(private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog) { }

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
  //format current date to German date syntax
  formatDate(currentDate: Date): string {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');
    const dayStr = `${date}.${month}.${year}`;
    return dayStr;
  }
  //get events from backend Database
  getEvents() {
    this.http.get<any>('http://193.197.231.167:3000/events').subscribe(//bwcloud IP can be changed
      (response) => {
        this.events = response.data;
        this.loadAppointmentsForDay();
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  //filter all appointments from current date
  loadAppointmentsForDay() {
    if (this.events) {
      this.appointments = this.events.filter((appointment: any) => appointment.date === this.selectedDate);
    } else {
      console.error('No appointments found');
    }
  }

  initializeHours() {
    for (let hour = 0; hour < 24; hour++) {
      this.hours.push(`${hour.toString().padStart(2, '0')}:00`);
    }
  }


}


