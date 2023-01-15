import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {Observable, BehaviorSubject, tap} from "rxjs";
import {ISearchRequest} from "../model/iSearchRequest";
import axios, {AxiosResponse} from "axios";
import {ITicket} from "../model/ITicket";
import {SignIn} from "../model/user";
import {Token} from "../model/token";
import {ACCESS_TOKEN_KEY, FILTER, TICKETLIST} from "./auth.service";
import {environment} from "../../environments/environment";
import {FilterService} from "./filter.service";
import {FreePlaces} from "../model/FreePlaces";


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  //BASE_URL = "https://localhost:7138/";
  GET_FILTERED_TICKETS = "api/Ticket/GetFilteredTickets";
  GET_All_TICKETS = "api/Ticket/GetTikets";
  UPDATE_TICKET = "api/Ticket/UpdateTiket";
  ADD_TICKET = "api/Ticket/AddTiket";
  GET_FW_FREE = "api/Ticket/fwFreeTickets";
  GET_BW_FREE = "api/Ticket/bwFreeTickets";
  // @ts-ignore
  tickets: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>();
  tickets$: Observable<ITicket[]> = this.tickets.asObservable();
  val: ITicket[];
  element: ITicket;

  constructor(private http: HttpClient,
              private filterService: FilterService) {
  }

  getAllTickets(): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(environment.BASE_URL + this.GET_All_TICKETS);
  }

  getFilteredTickets(searchRequest: ISearchRequest) {
    return this.http.post<ITicket[]>(environment.BASE_URL + this.GET_FILTERED_TICKETS, searchRequest)
      .pipe(
        tap(result => {
          console.log("response-------------");
          this.val = result;
          console.log(this.val);
          this.tickets$.pipe(take(1)).subscribe((data) => {
            console.log("PIPE-------------");
            console.log(JSON.stringify(data));
            this.tickets.next(this.val);
          });
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
  GetFwFreeTicket(ticket: ITicket) {

    return this.http.post<FreePlaces>(environment.BASE_URL + this.GET_FW_FREE, ticket);
  }
  GetBwFreeTicket(ticket: ITicket) {

    return this.http.post<FreePlaces>(environment.BASE_URL + this.GET_BW_FREE, ticket);
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

