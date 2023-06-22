import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {BehaviorSubject, Observable} from "rxjs";

import {ITicket} from "../model/ITicket";
import {IFilter} from "../model/IFilter";
import {take} from "rxjs/operators";
import {FilterService} from "../services/filter.service";
import {TicketService} from "../services/ticket.service";
import {F} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, DoCheck {
  ticketsData: ITicket[];
  tempTicketsData: ITicket[] = [];
  flightDuration = 24;
  noTransfer = false;
  oneTransfer = false;
  twoTransfers = false;
  minPrice: any;
  maxPrice: any;

  IsTransferMatches(checkedNum: number) {
    // console.log("checkedNum")
    // console.log(checkedNum)
    var result = false;
    if (!this.noTransfer && !this.oneTransfer && !this.twoTransfers) {
      result = true;
    }
    if (this.noTransfer && checkedNum == 0) {
      // console.log("noTransfer")
      result = true;
    }
    if (this.oneTransfer && checkedNum == 1) {
      // console.log("oneTransfer")
      result = true;
    }
    if (this.twoTransfers && checkedNum >= 2) {
      // console.log("twoTransfers")
      result = true;
    }
    return result;
  }

  IsMatches(ticket: ITicket) {


    if (this.flightDuration != 24) {
      if (!(ticket.totalFlightDuration <= this.flightDuration)) {
        return false;
      }
    }
    if (this.IsNumber(this.minPrice)) {
      if (!(ticket.totalPrice >= this.numberTryParse(this.minPrice))) {
        return false;
      }
    }
    if (this.IsNumber(this.maxPrice)) {
      if (!(ticket.totalPrice <= this.numberTryParse(this.maxPrice))) {
        return false;
      }
    }

    if (!ticket.isOneSide) {
      if (this.noTransfer && (ticket.fwFlight.numberOfTransfers!=0 || ticket.bwFlight.numberOfTransfers!=0)){
        return false;
      }
      if (this.IsTransferMatches(ticket.fwFlight.numberOfTransfers)) {
        return true;
      }
      if (this.IsTransferMatches(ticket.bwFlight.numberOfTransfers)) {
        return true;
      }
      return false;
    } else {
      if (!this.IsTransferMatches(ticket.fwFlight.numberOfTransfers)) {
        return false;
      }
    }

    return true;
  }

  ngDoCheck() {
    // console.log("check");
    this.ticketsData = this.ticketService.baseTicketsValue;
    if (this.ticketsData != undefined) {

      for (let ticket of this.ticketsData) {
        if (this.IsMatches(ticket)) {
          this.tempTicketsData.push(ticket);
        }
      }
      // console.log("transfers");
      // console.log(this.noTransfer);
      // console.log(this.oneTransfer);
      // console.log(this.twoTransfers);
      // console.log("tempTicketsData");
      // console.log(this.tempTicketsData);
      this.ticketService.SetTicketsValue(this.tempTicketsData);
      this.tempTicketsData = [];
    }


  }

  ngOnInit() {
    // this.ticketsData = this.ticketService.GetTicketsValue();
    //
    // console.log("ticketsData");
    // console.log(typeof this.ticketsData);


  }

  IsNumber(num: string) {
    if (this.numberTryParse(num) == -1) {
      return false;
    }
    return true;
  }

  numberTryParse(data: string) {
    var returnValue = -1;
    if (!isNaN(Number(data)) && data != null && data != "" && data != undefined) {
      // console.log("ПРОШЛО ПРОВЕРКУ");
      returnValue = Number.parseFloat(data);
      if (returnValue < 0)
        returnValue = -1;
      // console.log("value "+returnValue);
    }
    return returnValue;
  }

  constructor(
    private ticketService: TicketService,
    // private filterService: FilterService
  ) {
  }


  formatLabel(value: number) {
    return value;
  }

  filterParams() {

    //ADD PRICE
    var filterObj = new IFilter();
    filterObj.sliderValue = this.flightDuration;
    filterObj.noTransfer = this.noTransfer;
    filterObj.oneTransfer = this.oneTransfer;
    filterObj.twoTransfers = this.twoTransfers;
    // this.filterService.filter(filterObj);
  }
}
