import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
        this.selectedDate = new Date(params['date']);
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
}
