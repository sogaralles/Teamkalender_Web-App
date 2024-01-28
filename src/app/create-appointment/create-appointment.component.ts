import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
//import { KeycloakAdminClient } from 'keycloak-admin-client';
import * as KeycloakAdminClient from 'keycloak-admin-client';
import { CalenderComponent } from '../calender/calender.component';
import { HomeComponent } from '../home';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  selectedDate: any;
  dateValue: string = '';
  teamEventValue: number = 1;
  startTimeValue: string = '';
  endTimeValue: string = '';
  priorityValue: number = 0;
  matterValue: string = '';
  commentValue: string = '';
  ownerValue: any;
  isTeamEvent: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private keycloakService: KeycloakService) {
    this.route.queryParams.subscribe(params => {
      this.dateValue = this.route.snapshot.queryParams['date'] || '';
      console.log('dateValue', this.dateValue);
    });
    this.ownerValue=this.keycloakService.getUsername();
    console.log('.ownerValue', this.ownerValue);
  }

  ngOnInit(): void {
    this.getUSerInformation();
    //this.getAllUsers();
  }

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

  setPriority(priority: number): void {
    this.priorityValue = priority;
  }

  onCheckboxChange() {
    this.teamEventValue = this.isTeamEvent ? 2 : 1;
  }

  getUSerInformation() {//Gibt alle Informnationen des aktuellen USers zurück
    this.keycloakService.loadUserProfile().then(profile => {
      console.log('Benutzerprofil:', profile);
    });
  }

 /* keycloakAdmin = new KeycloakAdminClient({
    baseUrl: 'http://localhost:8080/auth/',
    realmName: 'teamkalender-realm',
    clientId: 'teamkalender_client',
    clientSecret: '823db38f-f69a-4627-99be-79d5625eb79c',
  });

  async getAllUsers() {
    try {
      await this.keycloakAdmin.auth({
        username: 'admin1',
        password: 'admin1',
      });
      const users = await this.keycloakAdmin.users.find();
    console.log('Alle Benutzer:', users);
    return users;
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error;
  } finally {
    await this.keycloakAdmin.deauth();
  }
}*/
}
