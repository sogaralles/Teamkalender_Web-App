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


  days: (Date | null)[] = [];
  weekNumbers: number[] = [];
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

  public logout() {
    this.keycloakService.logout(); //as parameter a url can be placed to be redirected to a public website
  }

  generateDays(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // offset for the first day

    this.days = [];
    for (let i = 1 - offset; i <= daysInMonth + (7 - ((daysInMonth + offset) % 7)); i++) {
      if (i <= 0 || i > daysInMonth) {
        this.days.push(null); // push empty day fields for the previous and next week
      } else {
        this.days.push(new Date(year, month - 1, i));
      }
    }

    const lastWeek = this.days.slice(-7); //creates a new Array with the last 7 elements of this.days
    const lastWeekHasData = lastWeek.some(day => day !== null); // checks if at least one day isn't empty

    if (!lastWeekHasData) {
      this.days = this.days.slice(0, -7); // remove last week if it's empty
    }

    this.weekNumbers = this.getWeekNumbers(year, month);
  }

  get chunkedDays(): (Date | null)[][] {
    const chunkSize = 7;
    const arrayCopy = [...this.days];
    const chunks = [];
    while (arrayCopy.length > 0) {
      chunks.push(arrayCopy.splice(0, chunkSize)); //removes chunkSize from index 0 
    }
    return chunks;
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear++;
    }
    this.generateDays(this.currentYear, this.currentMonth);
  }

  previousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear--;
    }
    this.generateDays(this.currentYear, this.currentMonth);
  }

  onDayClick(day: Date) {
    if (day instanceof Date) {
      this.router.navigate(['/create-appointment'], { queryParams: { date: day.toISOString() } });
    }
  }

  getWeekNumbers(year: number, month: number): number[] {
    //TODO: anpassen zu Kalenderwochen => zählt hoch, bis zum Jahresende, nicht monatlich
    const daysInMonth = new Date(year, month, 0).getDate();
    let weekNumber = 1;
    const weekNumbers: number[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month - 1, i);
      const currentDay = currentDate.getDay();

      if (currentDay === 0 || i === 1 || (i === daysInMonth && currentDay !== 0)) {
        weekNumbers.push(weekNumber);
        weekNumber++;
      }
    }

    return weekNumbers;
  }

  /*getEvents() { //funktioniert 05.01.24
    this.http.get<any[]>('http://localhost:3000/events').subscribe((data) => {
      this.events = data;
      this.logEvents();
    });
  }*/
  getEvents() {
    this.http.get<any>('http://localhost:3000/events').subscribe(
      (response) => {
        this.events = response.data;
        this.logEvents();
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  hasEventsOnDay(day: Date | null): boolean {
    if (day instanceof Date) {
      const year = day.getFullYear();
      const month = (day.getMonth() + 1).toString().padStart(2, '0');
      const date = day.getDate().toString().padStart(2, '0');
      const dayStr = `${date}.${month}.${year}`;
      return this.events.some((event: any) => {
        if (event.date) {
          const eventDateStr = event.date.split(' ')[0];
          return eventDateStr === dayStr;
        }
        return false;
      });
    }
    return false;
  }


  logEvents() {
    console.log('Events:', this.events);
  }
}
