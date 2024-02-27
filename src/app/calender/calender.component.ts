import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  backgroundColor: string = '';

  isPopupOpen: boolean = false;
  days: (Date | null)[] = [];
  //weekNumbers: number[] = [];
  currentYear: number;
  currentMonth: number;
  monthNames: string[] = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
    'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  events: any[] = [];

  constructor(private keycloakService: KeycloakService, private router: Router, private http: HttpClient) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
    this.generateDays(this.currentYear, this.currentMonth);
  }

  ngOnInit(): void {
    this.getEvents();
  }

  logout() {
    this.keycloakService.logout();
  }
  //generates array of days for each month with necessary empty day fields for the structure
  generateDays(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // offset for the first week until the first day of the month is reached, first day is a Sunday if firstDayOfMonth is 0
    const daysToReachSunday = daysInMonth + (7 - ((daysInMonth + offset) % 7));// Total days until the next Sunday after the current month days is reached
    this.days = [];

    for (let i = 1 - offset; i <= daysToReachSunday; i++) {
      if (i <= 0 || i > daysInMonth) {
        this.days.push(null); // push empty day fields for the first and last week of the month
      } else {
        this.days.push(new Date(year, month - 1, i));
      }
    }

    const lastWeek = this.days.slice(-7); //creates a new Array with the last 7 elements of this.days
    const lastWeekHasData = lastWeek.some(day => day !== null); // checks if at least one day isn't empty
    if (!lastWeekHasData) {
      this.days = this.days.slice(0, -7); // remove last week if it's empty
    }

  }
  //groups days of months into weekly chunks 
  get chunkedDays(): (Date | null)[][] {
    const chunkSize = 7;
    const arrayCopy = this.days.slice();
    const chunks = [];
    while (arrayCopy.length > 0) {
      const chunk = arrayCopy.splice(0, chunkSize); //removes chunkSize from index 0 
      chunks.push(chunk); 
    }
    return chunks;
  }
  //increase month
  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear++;
    }
    this.generateDays(this.currentYear, this.currentMonth);
  }
  //decrease month
  previousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear--;
    }
    this.generateDays(this.currentYear, this.currentMonth);
  }
  //by click on day of month navigate to daily-appointment with the date as ISOString
  onDayClick(day: Date) {
    if (day instanceof Date) {
      this.router.navigate(['/daily-appointment'], { queryParams: { date: day.toISOString() } });
    }
  }

  //get evenets from backend database
  getEvents() {
    this.http.get<any>('http://193.197.231.167:3000/events').subscribe(//bwcloud IP
      (response) => {
        this.events = response.data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }


  //shows public events for all and private events only for current user
  hasEventsOnDay(day: Date | null, teamEvent: number): boolean {
    if (day instanceof Date) {
      const year = day.getFullYear();
      const month = (day.getMonth() + 1).toString().padStart(2, '0');
      const date = day.getDate().toString().padStart(2, '0');
      const dayStr = `${date}.${month}.${year}`;

      return this.events.some((event: any) => {
        if (event.date && event.teamEvent === teamEvent) {
          let isCurrentUserEvent: boolean;
          if (teamEvent === 1) {
              isCurrentUserEvent = this.isCurrentUser(event);
          } else {
              isCurrentUserEvent = true;
          }
          return event.date === dayStr && isCurrentUserEvent;
        }
        return false;
        /*return this.events.some((event: any) => {
          if (event.date && event.teamEvent === teamEvent) {
            const isCurrentUserEvent = teamEvent === 1 ? this.isCurrentUser(event) : true; //show private events only for current user
            return event.date === dayStr && isCurrentUserEvent;
          }
          return false;*/
      });
    }
    return false;
  }

  isCurrentUser(appointment: any): boolean {
    const currentUsername = this.keycloakService.getUsername();
    return appointment.owner === currentUsername;
  }

}
