import {Component, Inject, Input, OnInit} from '@angular/core';
import axios from "axios";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthorizationComponent} from "../authorization/authorization.component";
import {Router} from "@angular/router";
import {AlertifyService} from "../services/alertify.service";
import {IUser} from "../model/user";
import {AuthService} from "../services/auth.service";
import {LogoutComponent} from "../dialog/logout/logout.component";
import {async, Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-search-nav-bar',
  templateUrl: './search-nav-bar.component.html',
  styleUrls: ['./search-nav-bar.component.css']
})
export class SearchNavBarComponent implements OnInit {

  @Input() showSearchMenu: boolean;

  // @ts-ignore
  loggedinUser: string;
  user: IUser;

  isloggedIn$: Observable<boolean>;
  //isloggedIn: boolean = false;


  constructor(private dialog: MatDialog,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log("SearchNavBarComponent init")

    this.isloggedIn$ = this.authService.isLoggedIn

    // this.isloggedIn$.pipe(take(1)).subscribe((data) => {
    //   console.log("data111111111111111111111")
    //   console.log(data)
    //   if (data != undefined) {
    //     this.isloggedIn = data;
    //   }
    // });
    // console.log("this.isloggedIn$")
    // console.log(this.isloggedIn$)
  }

  BASE_URL = "https://localhost:7138/";
  // GET_FLIGHTS = "api/Flight";
  // CREATE_USER = "api/Flight";


  // logOut(){
  //   this.authService.logout();
  //   this.isloggedIn = false;
  // }

  loggedIn() {
    if (this.authService.isAuthenticated()) {
      // @ts-ignore
      this.user = this.authService.getUserData();
      //this.isloggedIn = true;
      // console.log("user");
      // console.log(this.user);
      return true;
    }
    //return this.user;
    return false;
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
    // if (this.loggedIn()){
    //   this.isloggedIn = true;
    // }
  }

  openDialog() {
    this.dialog.open(LogoutComponent);
    // if (!this.loggedIn()){
    //   this.isloggedIn = false;
    // }
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


