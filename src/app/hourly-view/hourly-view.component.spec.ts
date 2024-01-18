import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyViewComponent } from './hourly-view.component';

describe('HourlyViewComponent', () => {
  let component: HourlyViewComponent;
  let fixture: ComponentFixture<HourlyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
