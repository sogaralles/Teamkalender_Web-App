import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { DailyAppointmentComponent } from './daily-appointment/daily-appointment.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HourlyViewComponent } from './hourly-view/hourly-view.component';




function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://193.197.231.167:8080/auth', //bwcloud IP can be changed
        realm: 'teamkalender-realm', 
        clientId: 'teamkalender_client' 
      },
      initOptions: {
        redirectUri: 'http://193.197.231.167:4200',//bwcloud IP can be changed
        checkLoginIframe: false 
      },
      loadUserProfileAtStartUp: true 
    });
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalenderComponent,
    CreateAppointmentComponent,
    DailyAppointmentComponent,
    HourlyViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
