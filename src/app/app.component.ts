import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //УДАЛИТЬ
  // title = 'datePicker';
  // currentDate: any = new Date();
  //
  // selectedToMatDate!: Date;
  // selectedFromMatDate!: Date;


  //invalidLogin: boolean = false;


  // private router: Router, private http: HttpClient
  constructor(private auth: AuthService) {
  }



}
