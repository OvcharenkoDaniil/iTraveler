import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import axios from "axios";
import {ISearchRequest} from "../model/iSearchRequest";
import {TicketService} from "../services/ticket.service";
import {AlertifyService} from "../services/alertify.service";
import {Router} from "@angular/router";

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
  flightClass = 'StandardClass';

  constructor(private ticketService: TicketService,
              private alertify: AlertifyService,
              private router:Router) {
  }

  ngOnInit(): void {
  }


  BASE_URL = "https://localhost:7138/";
  GET_FLIGHTS = "api/Flight";

  //CREATE_USER = "api/Flight";

  async getFilteredTickets(from: HTMLInputElement, to: HTMLInputElement) {
    try {

      // const obj: ISearchRequest = {
      //   DepartureCity: from.value,
      //   ArrivalCity: to.value,
      //   DepartureDate: this.selectedFromMatDate,
      //   ReturnDate: this.selectedReturnMatDate,
      //   NumberOfPassangers: +this.numberOfPassangers,
      //   FlightClass:this.flightClass
      // };
      const obj2: ISearchRequest = {
        DepartureCity: "AirportCity1",
        ArrivalCity: "AirportCity2",
        DepartureDate: this.selectedFromMatDate,
        ReturnDate: this.selectedFromMatDate,
        NumberOfPassangers: 2,
        FlightClass:"FirstClass"
      };
      console.log("obj");
      console.log(obj2);

      this.ticketService.getFilteredTickets(obj2)
        .subscribe(
        response => {
          // this.alertify.success('Tickets received');
          if (response!=null){
            this.router.navigateByUrl("/main");
          }
        }, error =>{
          // this.alertify.error('Tickets does not received');
        }
      );

      //this.searchRequest.emit(obj);
      // this.searchObj.DepartureCity = from.value;
      // this.searchObj.ArrivalCity = to.value;
      // this.searchObj.ArrivalCity = to.value;
      // this.searchRequest.emit()
      // const response = await axios.get(this.BASE_URL + this.GET_FLIGHTS);
    } catch (error) {
      console.error(error);
    }
  }

  // async getFlights() {
  //   try {
  //     const response = await axios.get(this.BASE_URL + this.GET_FLIGHTS);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


}


// const actions = {
//   async GET_ALL_FLIGHTS({commit}) {
//     try {
//       await axios.get("https://localhost:7138/api/Flight").then((response) => {
//         const flights = response.data.data;
//         if (flights.length === 0) {
//           alert("Пользователи не найдены");
//         }
//         alert(`Количество пользователей "${flights.length}"`);
//         commit("SET_FLIGHTS", flights);
//       });
//     } catch (error) {
//       console.log("err", error);
//     }
//   }
// }
