import {Component, Input, OnInit} from '@angular/core';
import {ITicket} from "../../model/ITicket";
import {IUser} from "../../model/user";
import {AuthService} from "../../services/auth.service";
import {ISearchRequest} from "../../model/iSearchRequest";
import {OrderVM} from "../../model/IOrder";
import {TicketService} from "../../services/ticket.service";
import {OrderService} from "../../services/order.service";
import {AlertifyService} from "../../services/alertify.service";
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {
  @Input() ticket: ITicket;
  @Input() mode: string;
  orderVM = new OrderVM();
  isTicket(){
    if (this.mode == "ticket"){
      return true;
    }
      return false;
  }
  isOrder(){
    if (this.mode == "order"){
      return true;
    }
      return false;
  }

  user: IUser;
  constructor(private authService:AuthService,
              private orderService: OrderService,
              private alertify: AlertifyService,
              private filterService: FilterService,
              private ticketService: TicketService) {
  }
  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }
  isAdmin() {
    //return this.authService.isAdmin()
    if (this.user.role =="Admin"){
      return true;
    }
    else return false;
  }


  DeleteOrder() {
    // console.log("this.ticket.ticketElem_id")
    // console.log(this.ticket.order_id)
    this.orderService.DeleteOrder(this.ticket.order_id)
      .subscribe(
        response => {
          this.alertify.success('Заказ успешно удалён');
          //localStorage.setItem(num)
          var user:IUser = this.authService.getUserData();

          this.orderService.getOrders(user).subscribe(
            response => {
              console.log("response orderService.GetOrders ")
              //console.log(response)
            }, error => {
              //this.alertify.error('Order does not get');
            }
          );
        }, error => {
          this.alertify.error('Заказ не удалён');
        }
      );
  }

  AddOrder() {

    // this.orderVM.ticket_id=7;
    // this.orderVM.numberOfTickets=this.ticket.numberOfPassengers;
    // var user:IUser = this.authService.getUserData();
    // this.orderVM.userEmail=user.email;
    // var searchRequest:ISearchRequest = this.ticketService.getFilterData();
    // this.orderVM.FlightClass= searchRequest.FlightClass;
    // this.orderService.AddOrder(this.orderVM)
    //   .subscribe(
    //     response => {
    //       this.alertify.success('Заказ успешно добавлен');
    //       console.log("response orderService.AddOrder ")
    //       console.log(response)
    //     }, error => {
    //       this.alertify.error('Заказ не добавлен');
    //     }
    //   );

    this.ticketService.AddTicket(this.ticket).subscribe(
      createdTicketId => {
        console.log("response ticketService.AddTicket")
        if (createdTicketId != 0) {
          this.orderVM.ticket_id=createdTicketId;
          this.orderVM.numberOfTickets=this.ticket.numberOfPassengers;
          var user:IUser = this.authService.getUserData();
          this.orderVM.userEmail=user.email;
          var searchRequest:ISearchRequest = this.filterService.getsearchRequestData();
          this.orderVM.FlightClass= searchRequest.FlightClass;

          this.orderService.AddOrder(this.orderVM)
            .subscribe(
              response => {
                this.alertify.success('Заказ успешно добавлен');
              }, error => {
                this.alertify.error('Заказ не добавлен');
              }
            );
        }
      }, error => {
        // this.alertify.error('Tickets does not received');
      }
    );


  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }




}
