import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable, BehaviorSubject, tap} from "rxjs";
import {ISearchRequest} from "../model/iSearchRequest";
import axios, {AxiosResponse} from "axios";
import {ITicket} from "../model/ITicket";
import {SignIn} from "../model/user";
import {Token} from "../model/token";
import {ACCESS_TOKEN_KEY, User} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  BASE_URL = "https://localhost:7138/";
  GET_FILTERED_TICKETS = "api/Ticket/GetFilteredTickets";
  GET_All_TICKETS = "api/Ticket/GetTikets";
  // @ts-ignore

  flights: BehaviorSubject<Array<IFlight>> = new BehaviorSubject<Array<IFlights>>();

  constructor(private http: HttpClient) {
  }

  flights$: Observable<Array<ITicket>> = this.flights.asObservable();

  // 'data/flights.json'
  // this.BASE_URL + this.GET_All_TICKETS
  getAllTickets(): Observable<ITicket[]> {
    //const response = await axios.get<BaseResponse<ITicket>>(this.BASE_URL + this.GET_All_TICKETS);

    return this.http.get<ITicket[]>(this.BASE_URL + this.GET_All_TICKETS);

    // return this.http.get<ITicket[]>(this.BASE_URL + this.GET_All_TICKETS).pipe(map(data => {
    //   console.log("GETRESULT------------------------------------------------------");
    //   let tickets = data;
    //   return tickets;
    // }));
  }

  // getAllTickets(): Observable<ITicket[]> {
  //   return this.http.get(this.BASE_URL+this.GET_All_TICKETS).pipe(
  //     map(data => {
  //       let res: any;
  //       let result: BaseResponse<ITicket>;
  //
  //       if (data) {
  //         res = data;
  //         console.log("GETRESULT------------------------------------------------------");
  //         result = res;
  //         console.log(result);
  //         for (var item in result.Data) {
  //           //result = res[item];
  //           console.log("val------------------------------------------------------");
  //         }
  //
  //       }
  //       //}
  //       return ticketsArray;
  //     })
  //   );
  // }


  // login(loginData: SignIn): Observable<Token> {
  //   return this.http.post<Token>(this.BASE_URL + this.LOGIN, loginData).pipe(
  //     tap(token => {
  //       localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
  //       var decode = this.jwtHelper.decodeToken(token.access_token);
  //       this.user = decode;
  //       localStorage.setItem(User, JSON.stringify(this.user));
  //
  //     })
  //   )
  // }

  getFilteredTickets(filter: ISearchRequest): Observable<ITicket[]> {
    //try {
      //let res: ITicket[];
      console.log("FILTER-------------");
      console.log(JSON.stringify(filter));
      // const response = this.http.get(this.BASE_URL + this.GET_FILTERED_TICKETS,{
      //   params: new HttpParams().set('filter', filter)
      // });
      return this.http.post<ITicket[]>(this.BASE_URL + this.GET_FILTERED_TICKETS, JSON.stringify(filter)).pipe(
        tap(data => {
          console.log("response-------------");
          console.log(data);
          localStorage.setItem("Tickets", JSON.stringify(data));
        })
      )
      console.log("-------------");
      // const response = await axios.get(this.BASE_URL+this.GET_FILTERED_TICKETS, {
      //   params: {
      //     filter: JSON.stringify(filter)
      //   }
      // });

    //} catch (error) {
    //  console.error(error);
    //}
  }

  //return this.http.get<IFlights[]>(this.baseUrl + '/propertytype/list');


}

