import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../services/ticket.service";

import {ITicket} from "../../model/ITicket";
import {TICKETLIST} from "../../services/auth.service";
import {Observable} from "rxjs";
import {IFilter} from "../../model/IFilter";
import {FilterService} from "../../services/filter.service";
import {take} from "rxjs/operators";
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
  SortFilter = '';
  mode: string = "ticket";
  //tickets: ITicket[];
  tickets$: Observable<ITicket[]>;
  filter$: Observable<IFilter>;
  constructor(
    private ticketService: TicketService,
    private filterService:FilterService
  ) {

  }

  ngOnInit(): void {
    console.log("IN FLIG LIST");
    console.log(JSON.stringify(this.tickets$));
    this.tickets$ = this.ticketService.tickets
    this.filter$ = this.filterService.filterObj

    // @ts-ignore
    // var data = JSON.parse(localStorage.getItem(TICKETLIST));
    // this.tickets = data;
    // this.ticketService.getAllTickets().subscribe(
    //   data=>{
    //     console.log("GETRESULT------------------------------------------------------");
    //     this.tickets = data;
    //     console.log("TICKETS------------------------------------------------------");
    //     console.log(this.tickets);
    //
    //
    //   },error => {
    //     console.log(error);
    //   }
    // );
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
