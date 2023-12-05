import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeBackendComponent } from './fake-backend.component';

describe('FakeBackendComponent', () => {
  let component: FakeBackendComponent;
  let fixture: ComponentFixture<FakeBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeBackendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
