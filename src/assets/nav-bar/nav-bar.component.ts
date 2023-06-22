import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AlertifyService} from "../services/alertify.service";
import axios from "axios";
import {AuthorizationComponent} from "../authorization/authorization.component";
import {IUser} from "../model/user";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser: string;

  constructor(
    private dialog: MatDialog,
    private router:Router,
    private alertify: AlertifyService,
    private authService:AuthService
  ) {}
  user:IUser;
  ngOnInit(): void {
  }

  logOut(){
    this.authService.logout();
  }

  loggedIn(){
    if (this.authService.isAuthenticated()){
    // @ts-ignore
      this.user = this.authService.getUserData();
      // console.log("user");
      // console.log(this.user);
    }
    return this.user;
  }


  openDialog() {
    this.dialog.open(AuthorizationComponent);
  }

}
