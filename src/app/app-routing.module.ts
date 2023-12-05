import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent, RegisterComponent } from './account';
import { DailyAppointmentComponent } from './daily-appointment/daily-appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { CalenderComponent } from './calender/calender.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'daily-appointment', component: DailyAppointmentComponent },
  { path: 'create-appointment', component: CreateAppointmentComponent },
  { path: 'calender', component: CalenderComponent },

  // home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
