import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import axios from "axios";
import {ISearchRequest} from "../model/iSearchRequest";
import {TicketService} from "../services/ticket.service";
import {AlertifyService} from "../services/alertify.service";
import {Router} from "@angular/router";
import {FilterService} from "../services/filter.service";
import {AuthService} from "../services/auth.service";

interface Passanger {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})


export class SearchMenuComponent implements OnInit {

  title = 'datePicker';
  currentDate: any = new Date();
  @Output() searchRequest = new EventEmitter<ISearchRequest>();
  searchObj: ISearchRequest;
  selectedFromMatDate: Date;
  selectedReturnMatDate: Date;
  numberOfPassangers = '1';
  isOneSide = false;
  flightClass = 'StandardClass';
  fromInput: any;
  toInput: any;


  constructor(private ticketService: TicketService,
              private alertify: AlertifyService,

              private filterService: FilterService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log("SetDefaultData------------------------");

    var filter = this.filterService.getsearchRequestData();
    console.log(filter);
    // this.fromInput = 'Лондон';
    // this.toInput = 'Париж';
    //
    // this.selectedFromMatDate = new Date("2023-05-19");
    // this.selectedReturnMatDate = new Date("2023-05-21");

    if (filter != null) {
      this.fromInput = filter.DepartureCity;
      this.toInput = filter.ArrivalCity;
      this.selectedFromMatDate = filter.DepartureDate;
      this.selectedReturnMatDate = filter.ReturnDate;
      this.numberOfPassangers = filter.NumberOfPassangers.toString();
      this.flightClass = filter.FlightClass;
      this.isOneSide = filter.isOneSide;
    }
  }


  BASE_URL = "https://localhost:7138/";
  GET_FLIGHTS = "api/Flight";

  //CREATE_USER = "api/Flight";

  async getFilteredTickets(from: HTMLInputElement, to: HTMLInputElement) {
    try {

      const filterData: ISearchRequest = {
        DepartureCity: from.value,
        ArrivalCity: to.value,
        DepartureDate: this.selectedFromMatDate,
        ReturnDate: this.selectedReturnMatDate,
        NumberOfPassangers: +this.numberOfPassangers,
        isOneSide: this.isOneSide,
        FlightClass: this.flightClass
      };
      if (!this.isValueEmpty(filterData)) {
        // console.log("DepartureCity--------");
        // console.log(filterData.DepartureDate);
        // console.log(filterData.ReturnDate);
        // console.log("isOneSide---------");
        // console.log(filterData.isOneSide);
        if (filterData.DepartureDate < filterData.ReturnDate && !filterData.isOneSide) {
          this.getFilteredTicketsData(filterData);
        }
        else if(filterData.isOneSide) this.getFilteredTicketsData(filterData);
        else this.alertify.error("Дата отправления не может быть позже даты прибытия")
      } else this.alertify.error("Заполните все поля")
    } catch (error) {
      console.error(error);
    }
  }

  getFilteredTicketsData(filterData:ISearchRequest){
    this.ticketService.getFilteredTickets(filterData)
      .subscribe(
        response => {
          console.log("ticketService.getFilteredTickets response")
          console.log(response)
          // this.alertify.success('Tickets received');
          if (response != null) {
            this.router.navigateByUrl("/main");
          } else this.alertify.error('Билеты не найдены');
        }, error => {
          // this.alertify.error('Tickets does not received');
        }
      );
  }

  private isValueEmpty(filterData: ISearchRequest) {
    console.log("filterData.ReturnDate");
    console.log(filterData.ReturnDate);
    if (
      filterData.DepartureCity == null ||
      filterData.ArrivalCity == null ||
      filterData.DepartureDate == null ||
      filterData.FlightClass == null ||
      filterData.NumberOfPassangers == null
    ) {
      if (filterData.isOneSide!=true && filterData.ReturnDate == undefined){
        return true;
      }
      return false;
    }
    return false;
  }
}



