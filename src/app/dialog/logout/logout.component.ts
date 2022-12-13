import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
