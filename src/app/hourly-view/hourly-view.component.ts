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

  isHourMarked(appointment: any, hour: string): boolean {
    return hour >= appointment.startTime && hour <= appointment.endTime;
  }
}
