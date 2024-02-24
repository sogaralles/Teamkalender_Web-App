import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  selectedDate: any;
  selectedHour: string = '';
  dateValue: string = '';
  teamEventValue: number = 1;
  startTimeValue: string = '';
  endTimeValue: string = '';
  priorityValue: number = 0;
  matterValue: string = '';
  commentValue: string = '';
  ownerValue: any;
  isTeamEvent: boolean = false;
  isDropDownStartTime: boolean = false;
  isDropDownEndTime: boolean = false;
  dropDownButton: string = '';
  hours: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private keycloakService: KeycloakService) {
    this.route.queryParams.subscribe(params => {
      this.dateValue = this.route.snapshot.queryParams['date'] || '';
    });
    this.ownerValue = this.keycloakService.getUsername();
    this.generateHours();
  }

  ngOnInit(): void {
    this.getUSerInformation();
  }
  //send post request to backend Database
  sendPostRequest() {
    const postData = {
      date: this.dateValue,
      teamEvent: this.teamEventValue,
      startTime: this.startTimeValue,
      endTime: this.endTimeValue,
      priority: this.priorityValue,
      matter: this.matterValue,
      comment: this.commentValue,
      owner: this.ownerValue

    };
    this.http.post('http://193.197.231.167:3000/events', postData) //bwcloud IP
      .subscribe((response) => {
      }, (error) => {
        console.error('POST request error', error);
      });
  }
  //format current date to German date syntax
  formatDate(currentDate: Date): string {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');
    const dayStr = `${date}.${month}.${year}`;
    return dayStr;
  }

  //set 1,2 or 3 as low,middle or high priority
  setPriority(priority: number): void {
    this.priorityValue = priority;
  }

  //set values for checkbox
  onCheckboxChange() {
    this.teamEventValue = this.isTeamEvent ? 2 : 1;
  }


  //shows Dropdown Menu for the Start Time or the End Time
  toggleDropDown(id: string, hour: string) {
    this.selectedHour = hour;

    if (id === 'dropDownStartTime') {
      this.startTimeValue = this.selectedHour;
      this.isDropDownStartTime = !this.isDropDownStartTime;
      this.isDropDownEndTime = false;
    } else if (id === 'dropDownEndTime') {
      this.endTimeValue = this.selectedHour;
      this.isDropDownEndTime = !this.isDropDownEndTime;
      this.isDropDownStartTime = false;
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  //Generates all hours for drop down menu
  generateHours() {
    for (let hour = 0; hour <= 24; hour++) {
      this.hours.push((hour < 10 ? "0" : "") + hour + ":00");
    }
  }

  //gives all informations of current user back
  getUSerInformation() {
    this.keycloakService.loadUserProfile().then(profile => {
    });
  }

}
