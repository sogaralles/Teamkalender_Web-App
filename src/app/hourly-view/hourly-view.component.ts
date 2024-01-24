import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hourly-view',
  templateUrl: './hourly-view.component.html',
  styleUrls: ['./hourly-view.component.scss']
})
export class HourlyViewComponent implements OnInit {
  @Input() hours: string[] = [];
  @Input() appointments: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  public openpopup(appointment: any) {
    appointment.show = true;
  }
  public closepopup(appointment: any) {
    appointment.show = false;
  }
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

  isHourMarked(appointment: any, hour: string): boolean {
    return hour >= appointment.startTime && hour <= appointment.endTime;
  }
}
