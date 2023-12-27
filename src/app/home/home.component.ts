import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }

  public username() : string{
    return this.keycloakService.getUsername();
  }

  public logout(){
    this.keycloakService.logout(); //as parameter a url can be placed to be redirected to a public website
  }

}
