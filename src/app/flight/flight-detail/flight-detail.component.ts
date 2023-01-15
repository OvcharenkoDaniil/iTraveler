import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ITicket} from "../../model/ITicket";
import {TicketService} from "../../services/ticket.service";
import {AuthService, FILTER} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {AlertifyService} from "../../services/alertify.service";
import {IFilter} from "../../model/IFilter";
import {ISearchRequest} from "../../model/iSearchRequest";
import {OrderService} from "../../services/order.service";
import {OrderVM} from "../../model/IOrder";
import {IUser} from "../../model/user";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {Observable} from "rxjs";
import {FilterService} from "../../services/filter.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  ISearchRequest$: Observable<ISearchRequest>;
  ticket: ITicket;
  orderVM = new OrderVM();
  id: number;
  fwNumberOfSeats: number;
  bwNumberOfSeats: number;
  read = true;
  user: IUser;

  nameee: string;
  dataaa: Date;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  isOneSeat: boolean = true;
  isTwoSeat: boolean = true;
  isThreeSeat: boolean = true;
  isloggedIn$: Observable<boolean>;

  fwfirstSeat: string;
  bwfirstSeat: string;
  fwsecondSeat: string;
  bwsecondSeat: string;
  bwthirdSeat: string;
  fwthirdSeat: string;
  fwFreePlaces: any;
  bwFreePlaces: any;
  searchRequest: ISearchRequest;

  constructor(
    // private router: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private orderService: OrderService,
    private filterService: FilterService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {

  }

  ngOnInit(): void {
    this.user = this.authService.getUserData();

    this.isloggedIn$ = this.authService.isLoggedIn
    this.dataaa = new Date();
    this.ISearchRequest$ = this.filterService.ISearchRequestObj
    this.id = +this.route.snapshot.params['id'];
    console.log(this.id)
    this.ticket = this.ticketService.getTicket(this.id);
    this.ISearchRequest$.pipe(take(1)).subscribe((data) => {
      if (data.FlightClass == "FirstClass") {
        this.fwNumberOfSeats = this.ticket.fwFirstClassCapacity
        this.bwNumberOfSeats = this.ticket.bwFirstClassCapacity
      }
      if (data.FlightClass == "StandardClass") {
        this.fwNumberOfSeats = this.ticket.fwStandardClassCapacity
        this.bwNumberOfSeats = this.ticket.bwStandardClassCapacity
      }
      if (data.NumberOfPassangers == 1) {
        this.isOneSeat = false;
      }
      if (data.NumberOfPassangers == 2) {
        this.isOneSeat = false;
        this.isTwoSeat = false;
      }
      if (data.NumberOfPassangers == 3) {
        this.isOneSeat = false;
        this.isTwoSeat = false;
        this.isThreeSeat = false;
      }
    });
    console.log("detail")

    this.searchRequest = this.filterService.getsearchRequestData();
    this.ticket.flightClass = this.searchRequest.FlightClass;
    this.getFreeTickets();

  }

  getFreeTickets() {
    this.ticketService.GetFwFreeTicket(this.ticket).subscribe(
      fwFreeTickets => {
        this.fwFreePlaces = fwFreeTickets.places

      }, error => {
        // this.alertify.error('Tickets does not received');
      }
    );
    this.ticketService.GetBwFreeTicket(this.ticket).subscribe(
      bwFreeTickets => {
        this.bwFreePlaces = bwFreeTickets.places

      }, error => {
        // this.alertify.error('Tickets does not received');
      }
    );
  }

  // isAdmin() {
  //
  //   return this.authService.isAdmin()
  // }
  isAdmin() {
    //return this.authService.isAdmin()
    if (this.user.role == "Admin") {
      this.read = false;
      return true;
    } else return false;
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
                this.router.navigateByUrl("/main")
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
    //this.ticket.bwFlightDuration = changeBwFlightForm.value.bwFlightDuration;
    this.ticket.bwNumberOfTransfers = changeBwFlightForm.value.bwNumberOfTransfers;
    this.ticket.bwArrivalDate = changeBwFlightForm.value.bwArrivalDate;
    this.ticket.bwArrivalTime = changeBwFlightForm.value.bwArrivalTime;
    this.ticket.bwDepartureDate = changeBwFlightForm.value.bwDepartureDate;
    this.ticket.bwDepartureTime = changeBwFlightForm.value.bwDepartureTime;
  }

  MapFwData(changeFwFlightForm: NgForm) {
    this.ticket.fwPrice = changeFwFlightForm.value.fwPrice;
    //this.ticket.fwFlightDuration = changeFwFlightForm.value.fwFlightDuration;
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
    console.log("NotFilled")

    if (this.isSeatsfilled()) {

      // if (!this.alreadyExist()) {


      this.ticketService.AddTicket(this.ticket).subscribe(
        createdTicketId => {
          //console.log("response ticketService.AddTicket")
          if (createdTicketId != 0) {
            localStorage.setItem("id", JSON.stringify(createdTicketId));
            this.orderVM.ticket_id = createdTicketId;
            this.orderVM.numberOfTickets = this.ticket.numberOfPassengers;
            var user: IUser = this.authService.getUserData();
            this.orderVM.userEmail = user.email;

            this.orderVM.FlightClass = this.searchRequest.FlightClass;

            this.orderService.AddOrder(this.orderVM)
              .subscribe(
                response => {
                  this.alertify.success('Заказ успешно добавлен');
                  this.getFreeTickets();
                }, error => {
                  this.alertify.error('Заказ не добавлен');
                }
              );
          } else this.alertify.error('Билет не добавлен');
        }, error => {
          // this.alertify.error('Tickets does not received');
        }
      );
    //}
    }


  }

  isAuthorized() {
    return undefined;
  }

  private isSeatsfilled() {
    var result: boolean = true;
    if (
      parseInt(this.fwfirstSeat) != NaN &&
      parseInt(this.fwsecondSeat) != NaN &&
      parseInt(this.fwthirdSeat) != NaN &&
      parseInt(this.bwfirstSeat) != NaN &&
      parseInt(this.bwsecondSeat) != NaN &&
      parseInt(this.bwthirdSeat) != NaN
    ) {
      console.log(this.isOneSeat)
      console.log(this.isTwoSeat)
      console.log(this.isThreeSeat)
      if (!this.isOneSeat) {
        if (parseInt(this.fwfirstSeat) > 0 && parseInt(this.fwfirstSeat) < this.fwNumberOfSeats) {
          this.ticket.fwFirst_ticket_num = parseInt(this.fwfirstSeat);
        } else {
          this.alertify.error("Отправление: Неверно заполнено поле Номер места для 1 пассажира");
          return false;
        }
        if (parseInt(this.bwfirstSeat) > 0 && parseInt(this.bwfirstSeat) < this.bwNumberOfSeats) {
          this.ticket.bwFirst_ticket_num = parseInt(this.bwfirstSeat);
        } else {
          this.alertify.error("Возвращение: Неверно заполнено поле Номер места для 1 пассажира");
          return false;
        }
      }
      if (!this.isTwoSeat) {
        if (parseInt(this.fwsecondSeat) > 0 && parseInt(this.fwsecondSeat) < this.fwNumberOfSeats) {
          this.ticket.fwSecond_ticket_num = parseInt(this.fwsecondSeat);
        } else {
          this.alertify.error("Отправление: Неверно заполнено поле Номер места для 2 пассажира");
          return false;
        }
        if (parseInt(this.bwsecondSeat) > 0 && parseInt(this.bwsecondSeat) < this.bwNumberOfSeats) {
          this.ticket.bwSecond_ticket_num = parseInt(this.bwsecondSeat);
        } else {
          this.alertify.error("Возвращение: Неверно заполнено поле Номер места для 2 пассажира");
          return false;
        }
      }
      if (!this.isThreeSeat) {
        if (parseInt(this.fwthirdSeat) > 0 && parseInt(this.fwthirdSeat) < this.fwNumberOfSeats) {
          this.ticket.fwThird_ticket_num = parseInt(this.fwthirdSeat);
        } else {
          this.alertify.error("Отправление: Неверно заполнено поле Номер места для 3 пассажира");
          return false;
        }
        if (parseInt(this.bwthirdSeat) > 0 && parseInt(this.bwthirdSeat) < this.bwNumberOfSeats) {
          this.ticket.bwThird_ticket_num = parseInt(this.bwthirdSeat);
        } else {
          this.alertify.error("Возвращение: Неверно заполнено поле Номер места для 3 пассажира");
          return false;
        }
      }
      return true;
    }

    return false;

  }

  alreadyExist() {
    var a = localStorage.getItem("id");
    if (a != null) {
      return true;
    }
    return false;
  }
}
