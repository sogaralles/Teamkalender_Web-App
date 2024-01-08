import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CalenderComponent } from '../calender/calender.component';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  selectedDate: any;
  dateValue: string = '';
  teamEventValue: number = 0;
  matterValue: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.selectedDate = this.formatDate(new Date(params['date']));
        this.dateValue = this.selectedDate;
      }
    });
  }

  ngOnInit(): void {
  }

  sendPostRequest() {
    const postData = {
      date: this.dateValue,
      teamEvent: this.teamEventValue,
      matter: this.matterValue
    };

    this.http.post('http://localhost:3000/events', postData)
      .subscribe((response) => {
        console.log('succesfull POST request', response);
      }, (error) => {
        console.error('POST request error', error);
      });
  }
  formatDate(currentDate: Date): string {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');
    const dayStr = `${date}.${month}.${year}`;
    return dayStr;
  }
}
