import { Component, OnInit } from '@angular/core';

let users = [{ username: "sogaralles", password: 'test123#!' }];


@Component({
  selector: 'app-fake-backend',
  templateUrl: './fake-backend.component.html',
  styleUrls: ['./fake-backend.component.scss']
})
export class FakeBackendComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
