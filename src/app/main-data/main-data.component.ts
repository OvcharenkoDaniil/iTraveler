import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.css']
})
export class MainDataComponent implements OnInit {


  title = 'datePicker';
  currentDate: any = new Date();
  cur:any;

  selectedToMatDate!: Date;
  selectedFromMatDate!: Date;

  constructor(private router:Router, private jwtHelper:JwtHelperService, private datepipe:DatePipe) {
    this.cur = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    //console.log("IN MAIN ");
  }
  // isUserAuthenticated() {
  //   // @ts-ignore
  //   let token: string = localStorage.getItem("jwt");
  //   if (token && !this.jwtHelper.isTokenExpired(token)) {
  //     return true;
  //   } else return false;
  // }
  //
  // logOut() {
  //   localStorage.removeItem("jwt");
  // }

}
