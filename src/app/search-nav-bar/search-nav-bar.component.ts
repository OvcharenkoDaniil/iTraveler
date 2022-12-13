import {Component, Inject, Input, OnInit} from '@angular/core';
import axios from "axios";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthorizationComponent} from "../authorization/authorization.component";
import {Router} from "@angular/router";
import {AlertifyService} from "../services/alertify.service";
import {IUser} from "../model/user";
import {AuthService} from "../services/auth.service";
import {LogoutComponent} from "../dialog/logout/logout.component";

@Component({
  selector: 'app-search-nav-bar',
  templateUrl: './search-nav-bar.component.html',
  styleUrls: ['./search-nav-bar.component.css']
})
export class SearchNavBarComponent implements OnInit {

  @Input() showSearchMenu: boolean;

  // @ts-ignore
  loggedinUser: string;
  user:IUser;

  constructor(private dialog: MatDialog,
              private router:Router,
              private alertify: AlertifyService,
              private authService:AuthService) {}

  ngOnInit(): void {
  }

  BASE_URL = "https://localhost:7138/";
  GET_FLIGHTS = "api/Flight";
  CREATE_USER = "api/Flight";


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

  // async createUser(user: any) {
  //   try {
  //     await axios.post(this.BASE_URL + this.CREATE_USER, user);
  //   } catch (error) {
  //     console.error(error);
  //
  //   }
  //
  // }

  // async Register() {
  //   try {
  //     const response = await axios.get(this.BASE_URL + this.GET_FLIGHTS);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  openAuthDialog() {
    this.dialog.open(AuthorizationComponent);
  }
  openDialog() {
    this.dialog.open(LogoutComponent);
  }

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string, dialogText: string): void {
  //
  //   const dialogRef = this.dialog.open(LogoutComponent, {
  //     data: dialogText,
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  //
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

}


