import {Component, Input, OnInit} from '@angular/core';
import {ITicket} from "../../model/ITicket";

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {
  @Input() ticket: ITicket;


  value() {
    console.log("this.ticket")
    console.log(this.ticket)

  }
}
