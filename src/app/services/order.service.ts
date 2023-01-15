import { Injectable } from '@angular/core';
import {IUser, RegisterVM} from "../model/user";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ITicket} from "../model/ITicket";
import {AuthService, FILTER, TICKETLIST} from "./auth.service";
import {Order, OrderData, OrderVM} from "../model/IOrder";
import {ISearchRequest} from "../model/iSearchRequest";
import {take} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //BASE_URL = "https://localhost:7138/";
  ADD_ORDER = "api/Order/AddOrder";
  DELETE_ORDER = "api/Order/DeleteOrder";
  GET_ORDERS = "api/Order/GetOrders";
  GET_ALL_ORDERS = "api/Order/GetAllOrders";

  user:IUser;
  // @ts-ignore
  orders: BehaviorSubject<ITicket[]> = new BehaviorSubject<ITicket[]>();
  orders$: Observable<ITicket[]> = this.orders.asObservable();
  constructor(
    private http : HttpClient,
    private router:Router,
    private authService : AuthService
  ) { }

  GetAllOrders() {
    return this.http.get<Order[]>(environment.BASE_URL+this.GET_ALL_ORDERS).pipe(
      tap(data=>{
        console.log("Register POST------------------------")
        console.log(data)

      })
    )
  }
  DeleteOrder(order_id: number) {
    console.log("DeleteOrder order_id")
    console.log(order_id)
    var order = new OrderData();
    order.orderId = order_id

    return this.http.post<Boolean>(environment.BASE_URL+this.DELETE_ORDER,order);
  }
  AddOrder(orderVM:OrderVM) {
    console.log("AddOrder service")
    console.log(JSON.stringify(orderVM))
    // @ts-ignore
    //const body = {ticket: ticket, email: this.user.email};
    return this.http.post<Boolean>(environment.BASE_URL+this.ADD_ORDER,orderVM);
  }

  getOrders(user:IUser) {
    return this.http.post<ITicket[]>(environment.BASE_URL + this.GET_ORDERS, user)
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
