import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {Observable, BehaviorSubject, tap} from "rxjs";
import {ISearchRequest} from "../model/iSearchRequest";
import axios, {AxiosResponse} from "axios";
import {ITicket} from "../model/ITicket";
import {SignIn} from "../model/user";
import {Token} from "../model/token";
import {ACCESS_TOKEN_KEY, TICKETLIST, User} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  BASE_URL = "https://localhost:7138/";
  GET_FILTERED_TICKETS = "api/Ticket/GetFilteredTickets";
  GET_All_TICKETS = "api/Ticket/GetTikets";
  // @ts-ignore


  tickets: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>();
  tickets$: Observable<ITicket[]> = this.tickets.asObservable();
  val:ITicket[];
  constructor(private http: HttpClient) {
  }


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



  getFilteredTickets(filter: ISearchRequest) {
    // console.log("FILTER-------------");
    // console.log(filter);
    return this.http.post<ITicket[]>(this.BASE_URL+this.GET_FILTERED_TICKETS,filter).pipe(
      tap(result=>{
        console.log("response-------------");
        this.val = result;
        console.log(this.val);
        this.tickets$.pipe(take(1)).subscribe((data)=>{
          console.log("PIPE-------------");
          console.log(JSON.stringify(data));
          this.tickets.next(this.val);
        });
        localStorage.removeItem(TICKETLIST);
        localStorage.setItem(TICKETLIST,JSON.stringify(this.val));
      })
    )

      // const response = await axios.get(this.BASE_URL+this.GET_FILTERED_TICKETS, {
      //   params: {
      //     filter: JSON.stringify(filter)
      //   }
      // });

  }


  getTicket(number: number) {
    var item = localStorage.getItem(TICKETLIST)
    return
  }
}

