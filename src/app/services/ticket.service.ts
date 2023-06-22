import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {Observable, BehaviorSubject, tap} from "rxjs";
import {ISearchRequest} from "../model/iSearchRequest";
import axios, {AxiosResponse} from "axios";
import {ITicket, ITicketFreePlaces} from "../model/ITicket";
import {SignIn} from "../model/user";
import {Token} from "../model/token";
import {ACCESS_TOKEN_KEY, FILTER, TICKETLIST} from "./auth.service";
import {environment} from "../../environments/environment";
import {FilterService} from "./filter.service";
import {FreePlaces} from "../model/FreePlaces";
import {PlaceService} from "./place.service";


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  //BASE_URL = "https://localhost:7138/";
  GET_FILTERED_TICKETS = "api/Flight/GetFilteredTickets";
  GET_All_TICKETS = "api/Ticket/GetTikets";
  UPDATE_TICKET = "api/Ticket/UpdateTiket";
  ADD_TICKET = "api/Flight/AddTiket";
  GET_FREE_PLACES = "api/Flight/FreePlaces";
  GET_BW_FREE = "api/Ticket/bwFreeTickets";
  // @ts-ignore
  tickets: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>();
  tickets$: Observable<ITicket[]> = this.tickets.asObservable();
  baseTicketsValue: ITicket[];
  val: ITicket[];
  element: ITicket;

  constructor(private http: HttpClient,
              private placeService: PlaceService,
              private filterService: FilterService) {
  }

  getAllTickets(): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(environment.BASE_URL + this.GET_All_TICKETS);
  }

  SetTicketsValue(value: ITicket[]) {
    console.log("SEET")
    this.tickets$.pipe(take(1)).subscribe((data) => {
      this.tickets.next(value);
    });
  }

  GetTicketsValue() {
    var value: ITicket[];
    this.tickets$.pipe(take(1)).subscribe((data) => {
      value = data;
    });
    // @ts-ignore
    return value;
  }

  ConvertToHours(timeStr: string[]) {
    var timeInHours: number=0;
    for (var i: number = 0; i < timeStr.length; i++) {

      if (i == timeStr.length - 1) {
        timeInHours += Number.parseInt(timeStr[i])/60;
      }
      else timeInHours += Number.parseInt(timeStr[i]);
    }
    return timeInHours;
  }

  ConvertDuration(tickets: ITicket[]) {
    for (let ticket of tickets) {
      ticket.totalFlightDuration =0;
      ticket.fwFlight.flightDurationInHours = this.ConvertToHours(this.placeService.SplitString(ticket.fwFlight.flightDuration,":"));
      console.log("FW TIME: "+ticket.fwFlight.flightDurationInHours);
      ticket.totalFlightDuration +=ticket.fwFlight.flightDurationInHours;
      if (!ticket.isOneSide){
        ticket.bwFlight.flightDurationInHours = this.ConvertToHours(this.placeService.SplitString(ticket.bwFlight.flightDuration,":"));
        console.log("BW TIME: "+ticket.bwFlight.flightDurationInHours);
        ticket.totalFlightDuration +=ticket.bwFlight.flightDurationInHours;
      }
      console.log("TOTAL TIME: "+ ticket.totalFlightDuration);
    }
  }

  getFilteredTickets(searchRequest: ISearchRequest) {
    this.tickets$.pipe(take(1)).subscribe((data) => {
      console.log("CLEEEEEAR-------------");
      console.log(JSON.stringify(data));
      this.tickets.next([]);
    });
    return this.http.post<ITicket[]>(environment.BASE_URL + this.GET_FILTERED_TICKETS, searchRequest)
      .pipe(
        tap(result => {
          console.log("response-------------");
          this.val = result;
          // this.
          this.ConvertDuration(this.val);
          this.baseTicketsValue = this.val;
          this.SetTicketsValue(this.val);
          // this.tickets$.pipe(take(1)).subscribe((data) => {
          //   console.log("PIPE-------------");
          //   console.log(JSON.stringify(data));
          //   this.tickets.next(this.val);
          // });
          console.log("this.tickets")
          console.log(this.tickets)
          this.filterService.AddSearchRequest(searchRequest);
          localStorage.removeItem(TICKETLIST);
          //localStorage.setItem(TICKETLIST, JSON.stringify(this.val));
          localStorage.setItem(FILTER, JSON.stringify(searchRequest));
        })
      )

    // const response = await axios.get(this.BASE_URL+this.GET_FILTERED_TICKETS, {
    //   params: {
    //     filter: JSON.stringify(filter)
    //   }
    // });

  }

  UpdateTicket(ticket: ITicket) {
    console.log("UpdateTicket PUT method")
    return this.http.post<boolean>(environment.BASE_URL + this.UPDATE_TICKET, ticket)
      .pipe(
        tap(data => {
          console.log("PUT result------------------------")
          console.log(data)
        })
      )
  }

  getTicket(ticketId: number) {

    this.tickets$.pipe(take(1)).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        //console.log("FOR")
        if (data[i].ticketElem_id == ticketId) {
          //console.log("FIND_DATA")
          this.element = data[i];
          //console.log(JSON.stringify(this.element))
        }
      }
    });
    return this.element;
  }


  AddTicket(ticket: ITicket) {
    console.log("ADDTicket");
    console.log(ticket);
    return this.http.post<number>(environment.BASE_URL + this.ADD_TICKET, ticket);
  }

  GetFreePlaces(ticket: ITicket) {
    var places: ITicketFreePlaces = new ITicketFreePlaces();
    places.fwFlight_id = ticket.fwFlight.flight_id;
    places.bwFlight_id = ticket.bwFlight.flight_id;
    places.flightClass = ticket.flightClass;
    return this.http.post<FreePlaces>(environment.BASE_URL + this.GET_FREE_PLACES, places);
  }

  //
  // getFilterData() {
  //
  //   // @ts-ignore
  //   var filter:ISearchRequest = JSON.parse(localStorage.getItem(FILTER));
  //   return filter;
  //
  // }
}

