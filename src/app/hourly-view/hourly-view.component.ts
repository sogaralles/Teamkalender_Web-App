import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-hourly-view',
  templateUrl: './hourly-view.component.html',
  styleUrls: ['./hourly-view.component.scss']
})
export class HourlyViewComponent implements OnInit {
  @Input() hours: string[] = [];
  @Input() appointments: any[] = [];

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }
  //show appointment in popup
  public openpopup(appointment: any) {
    appointment.show = true;
  }
  //close appointment in popup
  public closepopup(appointment: any) {
    appointment.show = false;
  }
  //get priorities low, medium, high
  getPriorityClass(priority: number): string {
    switch (priority) {
      case 1:
        return 'priority-green';
      case 2:
        return 'priority-yellow';
      case 3:
        return 'priority-red';
      default:
        return '';
    }
  }
  //set private/public borders
  isTeamEvent(priority: number, teamEvent: number): string {
    let classes = this.getPriorityClass(priority);

    if (teamEvent === 1) {
      classes += ' private-border';
    } else if (teamEvent === 2) {
      classes += ' public-border';
    }
    return classes;
  }
  //returns marked hours of appointments
  isHourMarked(appointment: any, hour: string): boolean {
    return hour >= appointment.startTime && hour < appointment.endTime;
  }

  isCurrentUser(appointment: any): boolean {
    const currentUsername = this.keycloakService.getUsername();
    return appointment.owner === currentUsername;
  }
}
