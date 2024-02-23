import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HourlyViewComponent } from './hourly-view/hourly-view.component';




function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        //url: 'http://193.197.231.167:8080/auth', //bwcloud
        realm: 'teamkalender-realm', //bwcloud
        clientId: 'teamkalender_client' //bwcloud
      },
      initOptions: {
        //onLoad: 'check-sso',
        //silentCheckSsoRedirectUri:
        //  window.location.origin + '/assets/silent-check-sso.html', 
        //redirectUri: 'http://193.197.231.167:4200',//bwcloud
        redirectUri: 'http://localhost:4200',
        checkLoginIframe: false //bwcloud
      },
      loadUserProfileAtStartUp: true //bwcloud
    });
}


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
