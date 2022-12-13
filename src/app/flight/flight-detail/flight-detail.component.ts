import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ITicket} from "../../model/ITicket";
import {TicketService} from "../../services/ticket.service";
import {AuthService, FILTER} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {AlertifyService} from "../../services/alertify.service";
import {IFilter} from "../../model/IFilter";
import {ISearchRequest} from "../../model/iSearchRequest";
import {OrderService} from "../../services/order.service";
import { OrderVM} from "../../model/IOrder";
import {IUser} from "../../model/user";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  ticket: ITicket;
  orderVM = new OrderVM();
  id: number;
  read = false;
  nameee: string;

  constructor(
    private router: ActivatedRoute,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private orderService: OrderService,
    private authService: AuthService,
      private alertify: AlertifyService
  ) {
  }

  ngOnInit(): void {
    console.log("detail")
    //this.ticket = this.route.snapshot.params['ticket'];
    this.id = +this.route.snapshot.params['id'];
    console.log(this.id)
    this.ticket = this.ticketService.getTicket(this.id);
    // this.route.data.subscribe(
    // // @ts-ignore
    //   (data: ITicket) => {
    //     return this.ticket = data['detailResolver'];
    //     console.log("DetailData")
    //     console.log(JSON.stringify(this.ticket))
    //   }
    // );
  }

  isAdmin() {
    if (this.authService.isAdmin()) {
      //console.log("flight detail isAdmin ----------")
      this.read = false;
      //console.log(this.read)
      return true;
    }
    this.read = true;
    return false;
  }

  SaveChanges() {
    return this.ticketService.UpdateTicket(this.ticket).subscribe(
      response => {
        //this.alertify.success('Tickets received');
        if (response != null) {
          console.log("Flight data successfully changed")
          // @ts-ignore
          var filter: ISearchRequest = JSON.parse(localStorage.getItem(FILTER))
          this.ticketService.getFilteredTickets(filter)
            .subscribe(
              response => {
                console.log("GET FILTER CALL SUCCESS")
                // this.alertify.success('Tickets received');
                // if (response!=null){
                //   this.router.navigateByUrl("/main");
                // }
              }, error => {
                // this.alertify.error('Tickets does not received');
              }
            );
        }
      }, error => {
        this.alertify.error('Ошибка при изменении данных');
      }
    )
      ;
  }


  MapBwData(changeBwFlightForm: NgForm) {
    this.ticket.bwPrice = changeBwFlightForm.value.bwPrice;
    this.ticket.bwNumberOfTransfers = changeBwFlightForm.value.bwNumberOfTransfers;
    this.ticket.bwArrivalDate = changeBwFlightForm.value.bwArrivalDate;
    this.ticket.bwArrivalTime = changeBwFlightForm.value.bwArrivalTime;
    this.ticket.bwDepartureDate = changeBwFlightForm.value.bwDepartureDate;
    this.ticket.bwDepartureTime = changeBwFlightForm.value.bwDepartureTime;
  }

  MapFwData(changeFwFlightForm: NgForm) {
    this.ticket.fwPrice = changeFwFlightForm.value.fwPrice;
    this.ticket.fwNumberOfTransfers = changeFwFlightForm.value.fwNumberOfTransfers;
    this.ticket.fwArrivalDate = changeFwFlightForm.value.fwArrivalDate;
    this.ticket.fwArrivalTime = changeFwFlightForm.value.fwArrivalTime;
    this.ticket.fwDepartureDate = changeFwFlightForm.value.fwDepartureDate;
    this.ticket.fwDepartureTime = changeFwFlightForm.value.fwDepartureTime;
  }

  ChangeBwFlight(changeBwFlightForm: NgForm) {

    this.MapBwData(changeBwFlightForm)
    // console.log("BW ticket")
    // console.log(this.ticket)
    this.SaveChanges();

  }

  ChangeFwFlight(changeFwFlightForm: NgForm) {

    this.MapFwData(changeFwFlightForm)
    // console.log("FW ticket")
    // console.log(this.ticket)
    this.SaveChanges();

  }

  AddOrder() {
          this.orderVM.ticket_id=7;
          this.orderVM.numberOfTickets=this.ticket.numberOfPassengers;
          var user:IUser = this.authService.getUserData();
          this.orderVM.userEmail=user.email;
          var searchRequest:ISearchRequest = this.ticketService.getFilterData();
          this.orderVM.FlightClass= searchRequest.FlightClass;
    this.orderService.AddOrder(this.orderVM)
      .subscribe(
        response => {
          this.alertify.success('Заказ успешно добавлен');
          console.log("response orderService.AddOrder ")
          console.log(response)
        }, error => {
           this.alertify.error('Заказ не добавлен');
        }
      );
    // this.ticketService.AddTicket(this.ticket).subscribe(
    //   createdTicketId => {
    //     console.log("response ticketService.AddTicket")
    //     if (createdTicketId != 0) {
    //       this.orderVM.ticket_id=createdTicketId;
    //       this.orderVM.numberOfTickets=this.ticket.numberOfPassengers;
    //       var user:IUser = this.authService.getUserData();
    //       this.orderVM.userEmail=user.email;
    //       var searchRequest:ISearchRequest = this.ticketService.getFilterData();
    //       this.orderVM.FlightClass= searchRequest.FlightClass;
    //
    //       this.orderService.AddOrder(this.orderVM)
    //         .subscribe(
    //           response => {
    //             // this.alertify.success('Tickets received');
    //             console.log("response sssssssssssssssssssssssssssssssss")
    //           }, error => {
    //             // this.alertify.error('Tickets does not received');
    //           }
    //         );
    //     }
    //   }, error => {
    //     // this.alertify.error('Tickets does not received');
    //   }
    // );


  }
}
