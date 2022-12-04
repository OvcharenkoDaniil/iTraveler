import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../services/ticket.service";

import {ITicket} from "../../model/ITicket";
@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  //Array<IFlights>


  Today = new Date();
  City = '';
  //SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  tickets: ITicket[];
  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {

    this.ticketService.getAllTickets().subscribe(
      data=>{
        console.log("GETRESULT------------------------------------------------------");
        this.tickets = data;
        console.log("TICKETS------------------------------------------------------");
        console.log(this.tickets);


      },error => {
        console.log(error);
      }
    );
  }

  // onCityFilter() {
  //   this.SearchCity = this.City;
  // }
  //
  // onCityFilterClear() {
  //   this.SearchCity = '';
  //   this.City = '';
  // }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

}
