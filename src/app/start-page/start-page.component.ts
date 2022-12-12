import { Component, OnInit } from '@angular/core';
import {ACCESS_TOKEN_KEY, User} from "../services/auth.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // localStorage.removeItem(ACCESS_TOKEN_KEY);
    // localStorage.removeItem(User);
  }

}
