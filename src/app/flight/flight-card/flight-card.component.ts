import {Component, Input, OnInit} from '@angular/core';
import {ITicket} from "../../model/ITicket";
import {IUser} from "../../model/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {
  @Input() ticket: ITicket;

  user: IUser;
  constructor(private authService:AuthService) {
  }
  isAdmin() {
    return this.authService.isAdmin()
    // if (this.authService.isAuthenticated()) {
    //   // @ts-ignore
    //   this.user = this.authService.getUserData();
    //   if (this.user.role=='Admin'){
    //     return true;
    //   }
    //
    // }
    // return false;
  }

}
