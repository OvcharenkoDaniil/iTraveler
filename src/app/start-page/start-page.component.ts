import { Component, OnInit } from '@angular/core';
import {ACCESS_TOKEN_KEY, AuthService, User} from "../services/auth.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.clearAllData()
    // localStorage.removeItem(ACCESS_TOKEN_KEY);
    // localStorage.removeItem(User);
  }

}
