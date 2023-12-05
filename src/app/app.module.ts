import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { DailyAppointmentComponent } from './daily-appointment/daily-appointment.component';
import { RegisterComponent } from './account/register/register.component';
import { FakeBackendComponent } from './fake-backend/fake-backend.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CalenderComponent,
    CreateAppointmentComponent,
    DailyAppointmentComponent,
    RegisterComponent,
    FakeBackendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
