import {Component, Input, OnInit} from '@angular/core';
import {ITicket} from "../../model/ITicket";
import {FlightVM} from "../../model/FlightVM";

@Component({
  selector: 'app-hand-luggage-card',
  templateUrl: './hand-luggage-card.component.html',
  styleUrls: ['./hand-luggage-card.component.css']
})
export class HandLuggageCardComponent implements OnInit {
  @Input() flight: FlightVM;
  @Input() flightClass: string;
  handLuggage: number;
  maxBaggagePlaces: number;
  constructor() { }

  ngOnInit(): void {
    this.maxBaggagePlaces=1;
    if (this.flightClass=="StandardClass"){
      this.handLuggage = this.flight.standardhandLuggageWeight;
    }else if (this.flightClass=="BusinessClass"){
      this.handLuggage = this.flight.businesshandLuggageWeight;
    }
  }

}
