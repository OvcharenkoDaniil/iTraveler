import { Injectable } from '@angular/core';
import {IUser, RegisterVM} from "../model/user";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ITicket} from "../model/ITicket";
import {AuthService, FILTER, TICKETLIST, User} from "./auth.service";
import {OrderData, OrderVM} from "../model/IOrder";
import {ISearchRequest} from "../model/iSearchRequest";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BASE_URL = "https://localhost:7138/";
  ADD_ORDER = "api/Order/AddOrder";
  DELETE_ORDER = "api/Order/DeleteOrder";
  GET_ORDERS = "api/Order/GetOrders";

  user:IUser;
  // @ts-ignore
  orders: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>();
  orders$: Observable<ITicket[]> = this.orders.asObservable();
  constructor(
    private http : HttpClient,
    private router:Router,
    private authService : AuthService
  ) { }

  DeleteOrder(order_id: number) {
    console.log("DeleteOrder order_id")
    console.log(order_id)
    var order = new OrderData();
    order.orderId = order_id
    return this.http.post<Boolean>(this.BASE_URL+this.DELETE_ORDER,order);
  }
  AddOrder(orderVM:OrderVM) {
    console.log("AddOrder service")
    console.log(JSON.stringify(orderVM))
    // @ts-ignore
    //const body = {ticket: ticket, email: this.user.email};
    return this.http.post<Boolean>(this.BASE_URL+this.ADD_ORDER,orderVM);
  }

  getOrders() {
    var user:IUser = this.authService.getUserData();
    console.log("userEmail-------------");
    console.log(user.email);
    return this.http.post<ITicket[]>(this.BASE_URL + this.GET_ORDERS, user)
      .pipe(
        tap(result => {
          console.log("getOrders-------------");
          this.orders$.pipe(take(1)).subscribe((data) => {
            console.log("data-------------");
            console.log(JSON.stringify(data));
            this.orders.next(result);
          });
          // localStorage.removeItem(TICKETLIST);
          // localStorage.setItem(TICKETLIST, JSON.stringify(this.val));
          // localStorage.setItem(FILTER, JSON.stringify(filter));
        })
      )

    // const response = await axios.get(this.BASE_URL+this.GET_FILTERED_TICKETS, {
    //   params: {
    //     filter: JSON.stringify(filter)
    //   }
    // });

  }


}
