import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent, RegisterComponent } from './account';
import { DailyAppointmentComponent } from './daily-appointment/daily-appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { CalenderComponent } from './calender/calender.component';
import { KeycloakGuard } from './keycloak.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [KeycloakGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'daily-appointment', component: DailyAppointmentComponent, canActivate: [KeycloakGuard] },
  { path: 'create-appointment', component: CreateAppointmentComponent, canActivate: [KeycloakGuard] },
  { path: 'calender', component: CalenderComponent, canActivate: [KeycloakGuard] },

  // home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
