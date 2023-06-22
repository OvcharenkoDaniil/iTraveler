import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ITicket} from "../../model/ITicket";
import {TicketService} from "../../services/ticket.service";
import {AuthService, FILTER} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AlertifyService} from "../../services/alertify.service";
import {IFilter} from "../../model/IFilter";
import {ISearchRequest} from "../../model/iSearchRequest";
import {OrderService} from "../../services/order.service";
import {OrderDetailVM, OrderVM} from "../../model/IOrder";
import {IUser} from "../../model/user";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {BehaviorSubject, isEmpty, Observable} from "rxjs";
import {FilterService} from "../../services/filter.service";
import {take} from "rxjs/operators";
import {DatePipe} from '@angular/common'
import {PlaceService} from "../../services/place.service";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit, DoCheck {
  isOneSeat = true;
  isTwoSeat = true;
  isThreeSeat = true;
  isFourSeat = true;
  isFiveSeat = true;
  ISearchRequest$: Observable<ISearchRequest>;
  ticket: ITicket;
  fwExtraPayment: number;
  bwExtraPayment: number;
  orderVM = new OrderVM();
  id: number;
  mode: string;
  // @ts-ignore
  isBaggageChecked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>();
  isBaggageChecked$: Observable<boolean> = this.isBaggageChecked.asObservable();
  // @ts-ignore
  isMultipleBaggageChecked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>();
  isMultipleBaggageChecked$: Observable<boolean> = this.isMultipleBaggageChecked.asObservable();
  fwSeatsCapacity: number;
  fwSeatsInRow: number;
  bwSeatsInRow: number;
  // isBaggageChecked: boolean;
  // isMultipleBaggageChecked: boolean;
  bwSeatsCapacity: number;
  fwDepartureDate: any;
  fwArrivalDate: any;
  bwArrivalDate: any;
  bwDepartureDate: any;
  read = true;
  user: IUser;

  dataaa: Date;

  @ViewChild('fwAutosize') fwAutosize: CdkTextareaAutosize;
  @ViewChild('bwAutosize') bwAutosize: CdkTextareaAutosize;
  // isOneSeat: boolean = true;
  // isTwoSeat: boolean = true;
  // isThreeSeat: boolean = true;

  isAdmin$: BehaviorSubject<boolean>;
  isloggedIn$: BehaviorSubject<boolean>;
  fwfirstSeatRow: string;
  bwfirstSeatRow: string;
  fwsecondSeatRow: string;
  bwsecondSeatRow: string;
  bwthirdSeatRow: string;
  fwthirdSeatRow: string;
  fwfourthSeatRow: string;
  fwfifthSeatRow: string;
  bwfourthSeatRow: string;
  bwfifthSeatRow: string;
  fwfirstSeat: string;
  bwfirstSeat: string;
  fwsecondSeat: string;
  bwsecondSeat: string;
  bwthirdSeat: string;
  fwthirdSeat: string;
  fwfourthSeat: string;
  fwfifthSeat: string;
  bwfourthSeat: string;
  bwfifthSeat: string;
  fwFreePlaces: any;
  bwFreePlaces: any;
  seatsLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  numberOfPlaces: string[] = [];
  fwSeatsRow: string[] = [];
  bwSeatsRow: string[] = [];
  fwSeatsLetters: string[] = [];
  bwSeatsLetters: string[] = [];
  freeFwSeats: number[] = [];
  freeBwSeats: number[] = [];
  flightClass: string;

  searchRequest: ISearchRequest;
  totalPrice: number;
  fwDefaultBaggageWeight: any;
  bwDefaultBaggageWeight: any;
  fwDefaultHandLuggageWeight: any;
  bwDefaultHandLuggageWeight: any;
  fwExtraBaggagePlaces: number;
  bwExtraBaggagePlaces: number;
  fwMaxBaggagePlaces: number;
  bwMaxBaggagePlaces: number;
  fwMaxBaggageWeight: number;
  bwMaxBaggageWeight: number;
  fwFood: string;
  fwDrink: string;
  fwWiFi: string;
  fwEntertainment: string;
  fwUSB: string;
  bwFood: string;
  bwDrink: string;
  bwWiFi: string;
  bwEntertainment: string;
  bwUSB: string;
  isOrder: boolean;


  ngDoCheck() {
    this.fwExtraPayment = 0;
    this.bwExtraPayment = 0;
    if (this.numberTryParse(this.fwAdditionalBaggageWeight) != -1) {
      this.fwExtraPayment += this.numberTryParse(this.fwAdditionalBaggageWeight) * this.ticket.fwFlight.baggageSurchargePrice;
    }
    if (this.numberTryParse(this.fwNumBaggagePlaces) != -1) {
      this.fwExtraPayment += this.numberTryParse(this.fwNumBaggagePlaces) * this.ticket.fwFlight.extraBaggagePrice;
    }

    if (this.numberTryParse(this.bwAdditionalBaggageWeight) != -1) {
      this.bwExtraPayment += this.numberTryParse(this.bwAdditionalBaggageWeight) * this.ticket.bwFlight.baggageSurchargePrice;
    }
    if (this.numberTryParse(this.bwNumBaggagePlaces) != -1) {
      this.bwExtraPayment += this.numberTryParse(this.bwNumBaggagePlaces) * this.ticket.bwFlight.extraBaggagePrice;
    }
    // this.fwExtraPayment = this.numberTryParse(this.fwNumBaggagePlaces) * this.ticket.fwFlight.extraBaggagePrice
    //   + this.numberTryParse(this.fwAdditionalBaggageWeight) * this.ticket.fwFlight.baggageSurchargePrice;
    // this.bwExtraPayment = this.numberTryParse(this.bwNumBaggagePlaces) * this.ticket.bwFlight.extraBaggagePrice
    //   + this.numberTryParse(this.bwAdditionalBaggageWeight) * this.ticket.bwFlight.baggageSurchargePrice;
    this.totalPrice = this.ticket.totalPrice + this.fwExtraPayment + this.bwExtraPayment;
  }

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private orderService: OrderService,
    private filterService: FilterService,
    private authService: AuthService,
    private placeService: PlaceService,
    private alertify: AlertifyService
  ) {

  }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.isBaggageChecked$.pipe(take(1)).subscribe((data) => {
      this.isBaggageChecked.next(true);
      // console.log("SET DEFAULT isBaggageChecked.value TRUE");
      // console.log(this.isBaggageChecked.value);
    });
    this.isMultipleBaggageChecked$.pipe(take(1)).subscribe((data) => {
      this.isMultipleBaggageChecked.next(false);
      // console.log("SET DEFAULT isMultipleBaggageChecked.value FALSE");
      // console.log(this.isMultipleBaggageChecked.value);
    });
    this.isloggedIn$ = this.authService.isLoggedIn
    this.isAdmin$ = this.authService.isAdmin
    this.dataaa = new Date();
    this.ISearchRequest$ = this.filterService.ISearchRequestObj;
    this.mode = this.route.snapshot.params['obj'];
    this.id = +this.route.snapshot.params['id'];
    if (this.mode == "order") {
      this.isOrder = true;
      this.ticket = this.orderService.getOrder(this.id);
    } else {
      this.isOrder = false;
      this.ticket = this.ticketService.getTicket(this.id);
    }
    //console.log(this.id)
    this.getFreePlaces();
    this.fwDepartureDate = this.datepipe.transform(this.ticket.fwFlight.departureDate, 'dd-MM-yyyy');
    this.fwArrivalDate = this.datepipe.transform(this.ticket.fwFlight.arrivalDate, 'dd-MM-yyyy');
    this.bwArrivalDate = this.datepipe.transform(this.ticket.bwFlight.arrivalDate, 'dd-MM-yyyy');
    this.bwDepartureDate = this.datepipe.transform(this.ticket.bwFlight.departureDate, 'dd-MM-yyyy');
    // var arr:string[] = new Array(this.ticket.numberOfPassengers);
    for (var i: number = 0; i < this.ticket.numberOfPassengers; i++) {
      this.numberOfPlaces.push("");
    }


    // if (!this.ticket.isOneSide)


    // if (data.FlightClass == "FirstClass") {
    //   this.fwNumberOfSeats = this.ticket.fwFlight.FirstClassCapacity
    //   this.bwNumberOfSeats = this.ticket.bwFlight.FirstClassCapacity
    // }
    this.fwMaxBaggagePlaces = this.ticket.fwFlight.maxExtraBaggagePlacesForPerson;
    this.bwMaxBaggagePlaces = this.ticket.bwFlight.maxExtraBaggagePlacesForPerson;
    this.fwMaxBaggageWeight = this.ticket.fwFlight.maxBaggageWeight;
    this.bwMaxBaggageWeight = this.ticket.bwFlight.maxBaggageWeight;
    if (this.ticket.flightClass == "StandardClass") {
      this.flightClass = "Стандарт";
      this.fwSeatsCapacity = this.ticket.fwFlight.standardClassCapacity;
      this.bwSeatsCapacity = this.ticket.bwFlight.standardClassCapacity;
      this.fwSeatsInRow = this.ticket.fwFlight.standardSeatsInRow;
      this.bwSeatsInRow = this.ticket.bwFlight.standardSeatsInRow;
      this.fwDefaultBaggageWeight = this.ticket.fwFlight.standardBaggageWeight;
      this.bwDefaultBaggageWeight = this.ticket.bwFlight.standardBaggageWeight;
      this.fwDefaultHandLuggageWeight = this.ticket.fwFlight.standardhandLuggageWeight;
      this.bwDefaultHandLuggageWeight = this.ticket.bwFlight.standardhandLuggageWeight;
      this.fwExtraBaggagePlaces = this.ticket.fwFlight.maxExtraBaggagePlacesForPerson - this.ticket.fwFlight.standardBaggagePlacesForPerson;
      this.bwExtraBaggagePlaces = this.ticket.bwFlight.maxExtraBaggagePlacesForPerson - this.ticket.bwFlight.standardBaggagePlacesForPerson;
      this.fwFood = this.ticket.fwFlight.standardFood;
      this.fwDrink = this.ticket.fwFlight.standardDrink;
      this.fwUSB = this.ticket.fwFlight.standardUSB;
      this.fwEntertainment = this.ticket.fwFlight.standardEntertainment;
      this.fwWiFi = this.ticket.fwFlight.standardWiFi;

      this.bwFood = this.ticket.bwFlight.standardFood;
      this.bwDrink = this.ticket.bwFlight.standardDrink;
      this.bwUSB = this.ticket.bwFlight.standardUSB;
      this.bwEntertainment = this.ticket.bwFlight.standardEntertainment;
      this.bwWiFi = this.ticket.bwFlight.standardWiFi;
    }
    if (this.ticket.flightClass == "BusinessClass") {              /////////////////////// ДОПОЛНИТЬ
      this.flightClass = "Бизнес";
      this.fwSeatsCapacity = this.ticket.fwFlight.businessClassCapacity;
      this.bwSeatsCapacity = this.ticket.bwFlight.businessClassCapacity;
      this.fwSeatsInRow = this.ticket.fwFlight.businessSeatsInRow;
      this.bwSeatsInRow = this.ticket.bwFlight.businessSeatsInRow;
      this.fwDefaultBaggageWeight = this.ticket.fwFlight.businessBaggageWeight;
      this.bwDefaultBaggageWeight = this.ticket.bwFlight.businessBaggageWeight;
      this.fwDefaultHandLuggageWeight = this.ticket.fwFlight.businesshandLuggageWeight;
      this.bwDefaultHandLuggageWeight = this.ticket.bwFlight.businesshandLuggageWeight;
      this.fwExtraBaggagePlaces = this.ticket.fwFlight.maxExtraBaggagePlacesForPerson - this.ticket.fwFlight.businessBaggagePlacesForPerson;
      this.bwExtraBaggagePlaces = this.ticket.bwFlight.maxExtraBaggagePlacesForPerson - this.ticket.bwFlight.businessBaggagePlacesForPerson;

      this.fwFood = this.ticket.fwFlight.businessFood;
      this.fwDrink = this.ticket.fwFlight.businessDrink;
      this.fwUSB = this.ticket.fwFlight.businessUSB;
      this.fwEntertainment = this.ticket.fwFlight.businessEntertainment;
      this.fwWiFi = this.ticket.fwFlight.businessWiFi;

      this.bwFood = this.ticket.bwFlight.businessFood;
      this.bwDrink = this.ticket.bwFlight.businessDrink;
      this.bwUSB = this.ticket.bwFlight.businessUSB;
      this.bwEntertainment = this.ticket.bwFlight.businessEntertainment;
      this.bwWiFi = this.ticket.bwFlight.businessWiFi;
    }
    if (this.ticket.numberOfPassengers == 1) {
      this.isOneSeat = false;
    }
    if (this.ticket.numberOfPassengers == 2) {
      this.isOneSeat = false;
      this.isTwoSeat = false;
    }
    if (this.ticket.numberOfPassengers == 3) {
      this.isOneSeat = false;
      this.isTwoSeat = false;
      this.isThreeSeat = false;
    }
    if (this.ticket.numberOfPassengers == 4) {
      this.isOneSeat = false;
      this.isTwoSeat = false;
      this.isThreeSeat = false;
      this.isFourSeat = false;
    }
    if (this.ticket.numberOfPassengers == 5) {
      this.isOneSeat = false;
      this.isTwoSeat = false;
      this.isThreeSeat = false;
      this.isFourSeat = false;
      this.isFiveSeat = false;
    }

    //console.log("detail")

    //this.searchRequest = this.filterService.getsearchRequestData();
    //this.ticket.flightClass = this.searchRequest.FlightClass;


  }

  DeleteOrder() {
    // console.log("this.ticket.ticketElem_id")
    // console.log(this.ticket.order_id)
    this.orderService.DeleteOrder(this.ticket.order_id)
      .subscribe(
        response => {
          this.alertify.success('Заказ успешно удалён');
          //localStorage.setItem(num)
          var user: IUser = this.authService.getUserData();

          this.orderService.getOrders(user.email).subscribe(
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

  getFreePlaces() {
    this.ticketService.GetFreePlaces(this.ticket).subscribe(
      freePlaces => {


        // this.fwFreePlaces = freePlaces.fwPlaces
        //console.log("fwPlaces");
        //console.log(freePlaces.fwPlaces.slice(0, -1));
        //console.log("bwPlaces");
        //console.log(freePlaces.bwPlaces.slice(0, -1));
        // this.bwFreePlaces = freePlaces.bwPlaces
        //console.log("getFreePlaces--------------------------------------");


        // .slice(0, -1)
        this.freeFwSeats = this.ConvertFreeSeats(freePlaces.fwPlaces);
        // console.log("ConvertFwFreeSeats--------------------------------------");
        // console.log(this.freeFwSeats);


        // .slice(0, -1)
        this.freeBwSeats = this.ConvertFreeSeats(freePlaces.bwPlaces);
        // console.log("ConvertBwFreeSeats--------------------------------------");
        // console.log(this.freeBwSeats);
        if (this.freeFwSeats.length != 0) {
          //console.log("fw not empt--------------------------------------");
          this.fwFreePlaces = this.SetFreeSeatsString(this.fwSeatsCapacity, this.freeFwSeats, this.fwSeatsInRow);
        }
        if (this.freeBwSeats.length != 0) {
          //console.log("bw not empt--------------------------------------");
          this.bwFreePlaces = this.SetFreeSeatsString(this.bwSeatsCapacity, this.freeBwSeats, this.bwSeatsInRow);
        }

      }, error => {
        // this.alertify.error('Tickets does not received');
      }
    );

  }

  GetLetterByNum(seatNum: number, placesInRow: number) {
    // console.log("seatNum: "+seatNum+ "placesInRow: "+placesInRow)
    // console.log("this.seatsLetters: "+this.seatsLetters)
    for (var i: number = 0; i < placesInRow; i++) {
      // console.log("seatNum: "+seatNum +'i: '+i)
      if (seatNum == i + 1) {
        return this.seatsLetters[i];
      }
    }
    return 'wtf';
  }

  SetFreeSeatsString(numberOfSeats: number, seatArr: number[], placesInRow: number) {
    var freePlacesStr: string = "";
    //var numberOfRows = numberOfSeats/placesInRow;

    // freePlacesStr += "Ряд 1: ";
    // for (var i: number = 0; i < numberOfRows; i++) {
    // console.log("seatArr--------------------------------------");
    // console.log(seatArr);
    // console.log("placesInRow--------------------------------------");
    // console.log(placesInRow);
    var i: number = 0;
    var isSet = false;
    for (let seat of seatArr) {
      // console.log("seat--------------------------------------");
      // console.log(seat);
      // console.log("Math.trunc(seat / placesInRow)--------------------------------------");
      // console.log(Math.trunc(seat / placesInRow));
      // console.log("i");
      // console.log(i);
      if (Math.trunc(seat / placesInRow) == i) {
        if (!isSet) {
          //console.log("тут ряд");
          let y = i + 1;
          freePlacesStr += "Ряд " + y + ": ";
          isSet = true;
        }
        // console.log("обычное")
        // console.log(seat % placesInRow)
        freePlacesStr += this.GetLetterByNum(seat % placesInRow, placesInRow) + " ";

      } else if (seat % placesInRow == 0 && seat / placesInRow == i + 1) {
        // console.log("placesInRow")
        // console.log(placesInRow)
        freePlacesStr += this.GetLetterByNum(placesInRow, placesInRow) + "\n";
        isSet = false;
        i++;
      } else i++;
    }
    // console.log("freePlacesStr--------------------------------------");
    // console.log(freePlacesStr);
    //}
    return freePlacesStr;

  }

  ConvertFreeSeats(freePlacesStr: string) {
    var freeSeats: number[] = [];
    var seats = this.placeService.SplitString(freePlacesStr, ",");
    // console.log("seats---------------------------------------------");
    // console.log(seats);
    if (this.IsNumbers(seats)) {
      //console.log("внутри---------------------------------------------");
      for (let seat of seats) {
        var value = this.numberTryParse(seat);
        // console.log("value---------------------------------------------");
        // console.log(value);
        if (value != -1) {
          freeSeats.push(value);

        } else {
          //console.log("WTF--------------------------------------");
          freeSeats = [];
          return freeSeats;
        }
      }
      // console.log("freeSeats--------------------------------------");
      // console.log(freeSeats);

    }
    return freeSeats;
  }

  // isAdmin() {
  //
  //   return this.authService.isAdmin()
  // }
  isAdmin() {
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
    this.ticket.bwFlight.price = changeBwFlightForm.value.bwPrice;
    //this.ticket.bwFlight.FlightDuration = changeBwFlightForm.value.bwFlightDuration;
    this.ticket.bwFlight.numberOfTransfers = changeBwFlightForm.value.bwNumberOfTransfers;
    this.ticket.bwFlight.arrivalDate = changeBwFlightForm.value.bwArrivalDate;
    this.ticket.bwFlight.arrivalTime = changeBwFlightForm.value.bwArrivalTime;
    this.ticket.bwFlight.departureDate = changeBwFlightForm.value.bwDepartureDate;
    this.ticket.bwFlight.departureTime = changeBwFlightForm.value.bwDepartureTime;
  }

  MapFwData(changeFwFlightForm: NgForm) {
    this.ticket.fwFlight.price = changeFwFlightForm.value.fwPrice;
    //this.ticket.fwFlight.FlightDuration = changeFwFlightForm.value.fwFlightDuration;
    this.ticket.fwFlight.numberOfTransfers = changeFwFlightForm.value.fwNumberOfTransfers;
    this.ticket.fwFlight.arrivalDate = changeFwFlightForm.value.fwArrivalDate;
    this.ticket.fwFlight.arrivalTime = changeFwFlightForm.value.fwArrivalTime;
    this.ticket.fwFlight.departureDate = changeFwFlightForm.value.fwDepartureDate;
    this.ticket.fwFlight.departureTime = changeFwFlightForm.value.fwDepartureTime;
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

  IsNumber(num: string) {
    // console.log("VALUE")
    // console.log(num)
    if (this.numberTryParse(num) == -1) {
      return false;
    }
    return true;
  }

  IsNumbers(numbers: string[]) {
    // console.log("IsNumbers")
    // console.log(numbers)
    for (let num of numbers) {
      if (!this.IsNumber(num)) {
        // console.log("ТУТ FALSE")
        // console.log(num)
        return false;
      }
    }
    return true;
  }

  numberTryParse(data: string) {
    var returnValue = -1;
    // console.log("получили--------------------------------------");
    // console.log(data);
    // console.log("&&Number.isInteger(data)--------------------------------------");
    // console.log(Number.isInteger(Number.parseFloat(data)));

    if (!isNaN(Number(data)) && data != null && data.trim() != "" && data != undefined && data == Number.parseInt(data).toString()) {
      returnValue = Number.parseInt(data);
      // this.alertify.success(data);
      // console.log("after parse");
      // console.log(returnValue);
      if (returnValue < 0)
        returnValue = -1;
    }
    // console.log("возврат   numberTryParse");
    // console.log(returnValue);
    return returnValue;
  }

  CreateSeatNumbersString(numbers: string[]) {
    var result = "";
    for (let num of numbers) {
      result += num + ',';
    }
    console.log("SEEEEEEEEEEEEEATS" + result);
    return result;
  }


  // GetFwPlaces() {
  //   this.AddValue(this.fwPassengerPlace1.value.toString(), this.numberOfFwPlaces);
  //   this.AddValue(this.fwPassengerPlace2.value.toString(), this.numberOfFwPlaces);
  //   this.AddValue(this.fwPassengerPlace3.value.toString(), this.numberOfFwPlaces);
  //   this.AddValue(this.fwPassengerPlace4.value.toString(), this.numberOfFwPlaces);
  //   this.AddValue(this.fwPassengerPlace5.value.toString(), this.numberOfFwPlaces);
  //   this.AddValue(this.fwPassengerPlace6.value.toString(), this.numberOfFwPlaces);
  //   this.AddValue(this.fwPassengerPlace7.value.toString(), this.numberOfFwPlaces);
  //   this.AddValue(this.fwPassengerPlace8.value.toString(), this.numberOfFwPlaces);
  // }
  //
  // AddValue(value: string, arr: string[]) {
  //   if (value != undefined && value != null) {
  //     arr.push(value);
  //   }
  // }
  //
  // GetBwPlaces() {
  //   this.AddValue(this.bwPassengerPlace1.value.toString(), this.numberOfBwPlaces);
  //   this.AddValue(this.bwPassengerPlace2.value.toString(), this.numberOfBwPlaces);
  //   this.AddValue(this.bwPassengerPlace3.value.toString(), this.numberOfBwPlaces);
  //   this.AddValue(this.bwPassengerPlace4.value.toString(), this.numberOfBwPlaces);
  //   this.AddValue(this.bwPassengerPlace5.value.toString(), this.numberOfBwPlaces);
  //   this.AddValue(this.bwPassengerPlace6.value.toString(), this.numberOfBwPlaces);
  //   this.AddValue(this.bwPassengerPlace7.value.toString(), this.numberOfBwPlaces);
  //   this.AddValue(this.bwPassengerPlace8.value.toString(), this.numberOfBwPlaces);
  // }

  Add() {
    if (this.DataValid()) {
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

      var a = this.GetSeatNumber(this.fwSeatsRow, this.fwSeatsLetters, this.fwSeatsInRow);
      // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
      var b = this.GetSeatNumber(this.bwSeatsRow, this.bwSeatsLetters, this.bwSeatsInRow);
      console.log("-----------------------------------------------------");
      console.log("-----------------------------------------------------");
      console.log("-----------------------------------------------------");
    }
  }

  GetSeatNumber(seatsRow: string[], seatLetters: string[], seatsInRow: number) {
    var result: string = "";
    var seats: number[] = [];
    console.log("seatsRow")
    console.log(seatsRow)
    console.log("seatLetters")
    console.log(seatLetters)
    console.log("seatsInRow")
    console.log(seatsInRow)

    for (var seatLetter of seatLetters) {
      var i = 1;
      for (var letter of this.seatsLetters) {
        if (letter.toUpperCase() == seatLetter.toUpperCase()) {

          seats.push(i);
        }
        i++;
      }
    }
    console.log("seats")
    console.log(seats)
    for (let j: number = 0; j < seats.length; j++) {
      result += ((this.numberTryParse(seatsRow[j]) - 1) * seatsInRow + seats[j]).toString() + ',';
      // console.log("seatArr")
      // console.log(seats[i]+seatsLetters[i])
    }
    console.log("RESULT")
    console.log(result)
    return result;
  }

  AddOrder() {
    console.log("AddOrder")

    var orderDetail: OrderDetailVM = new OrderDetailVM();

    ///////////////////
    ///////////////////  this.DataValid() разобраться с местами (ISNUMBERS там массив)
    ///////////////////

//Добавить условие
    if (this.DataValid()) {


      // if (!this.alreadyExist()) {!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //console.log("response ticketService.AddTicket")


      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // orderDetail.fwSeatNumbers = this.CreateSeatNumbersString(this.numberOfFwPlaces);

      orderDetail.fwSeatNumbers = this.GetSeatNumber(this.fwSeatsRow, this.fwSeatsLetters, this.fwSeatsInRow);
      var user: IUser = this.authService.getUserData();
      orderDetail.email = user.email;
      orderDetail.IsOneSide = this.ticket.isOneSide;
      //////это поле не нужно пересчитывать
      orderDetail.fwPrice = this.ticket.fwFlight.price;
      orderDetail.fwFlight_id = this.ticket.fwFlight.flight_id;
      orderDetail.fwTotalExtraBaggageWeight = this.fwAdditionalBaggageWeight;
      orderDetail.flightClass = this.ticket.flightClass;
      orderDetail.numberOfTickets = this.ticket.numberOfPassengers;
      if (this.ticket.flightClass == "StandardClass") {
        orderDetail.fwNumberOfBaggagePlaces = this.ticket.fwFlight.standardBaggagePlacesForPerson + this.numberTryParse(this.fwNumBaggagePlaces);
      } else if (this.ticket.flightClass == "BusinessClass") {
        orderDetail.fwNumberOfBaggagePlaces = this.ticket.fwFlight.businessBaggagePlacesForPerson + this.numberTryParse(this.fwNumBaggagePlaces);
      }
      orderDetail.bwSeatNumbers = orderDetail.fwSeatNumbers;
      //////это поле не нужно пересчитывать
      orderDetail.bwPrice = orderDetail.fwPrice;
      orderDetail.bwTotalExtraBaggageWeight = orderDetail.fwTotalExtraBaggageWeight;
      orderDetail.bwFlight_id = orderDetail.fwFlight_id;
      if (!this.ticket.isOneSide) {

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // orderDetail.bwSeatNumbers = this.CreateSeatNumbersString(this.numberOfBwPlaces);

        orderDetail.bwSeatNumbers = this.GetSeatNumber(this.bwSeatsRow, this.bwSeatsLetters, this.bwSeatsInRow);
        //////это поле не нужно пересчитывать
        orderDetail.bwPrice = this.ticket.bwFlight.price;
        orderDetail.bwTotalExtraBaggageWeight = this.bwAdditionalBaggageWeight;
        orderDetail.bwFlight_id = this.ticket.bwFlight.flight_id;
        if (this.ticket.flightClass == "StandardClass") {
          orderDetail.bwNumberOfBaggagePlaces = this.ticket.bwFlight.standardBaggagePlacesForPerson + this.numberTryParse(this.bwNumBaggagePlaces);
        } else if (this.ticket.flightClass == "BusinessClass") {
          orderDetail.bwNumberOfBaggagePlaces = this.ticket.bwFlight.businessBaggagePlacesForPerson + this.numberTryParse(this.bwNumBaggagePlaces);
        }
      }

      console.log("orderDetail--------------------------");
      console.log(orderDetail);
      this.orderService.AddOrder(orderDetail)
        .subscribe(
          response => {
            if (response!=0){
              this.alertify.success('Заказ успешно добавлен');
              this.getFreePlaces();
            }
            else this.alertify.error('Заказ не добавлен');
          }, error => {
            this.alertify.error('Заказ не добавлен');
          }
        );

    }
    // else {
    //   this.alertify.error("Возвращение: Неверно заполнено поле Номер места для 3 пассажира");
    //   return false;
    // }
  }


  GetSeatsRowArray(arr: string[], firstSeatRow: string, secondSeatRow: string, thirdSeatRow: string, fourthSeatRow: string, fifthSeatRow: string) {
    arr = [];
    arr.push(firstSeatRow);
    if (!this.isTwoSeat) {
      arr.push(secondSeatRow);
    }
    if (!this.isThreeSeat) {
      arr.push(thirdSeatRow);
    }
    if (!this.isFourSeat) {
      arr.push(fourthSeatRow);
    }
    if (!this.isFiveSeat) {
      arr.push(fifthSeatRow);
    }
    // console.log("array")
    // console.log(arr)
    return arr;
  }

  GetSeatsArray(arr: string[], firstSeat: string, secondSeat: string, thirdSeat: string, fourthSeat: string, fifthSeat: string) {
    arr = [];
    arr.push(firstSeat);
    if (!this.isTwoSeat) {
      arr.push(secondSeat);
    }
    if (!this.isThreeSeat) {
      arr.push(thirdSeat);
    }
    if (!this.isFourSeat) {
      arr.push(fourthSeat);
    }
    if (!this.isFiveSeat) {
      arr.push(fifthSeat);
    }
    // console.log("array")
    // console.log(arr)
    return arr;
  }

  IsSeatsValid(seats: string[], seatLetters: string[], seatsInRow: number, side: string, totalSeats: number) {
    var totalRows = totalSeats / seatsInRow;
    var i = 1;
    var value = true;
    for (var seatRow of seats) {
      if (!this.IsNumber(seatRow) || this.numberTryParse(seatRow) > totalRows) {
        this.alertify.error(side + ": Поле \"Ряд для " + i + " пасажира\" не валидно");
        return false;
      }
      i++;
    }
    i = 1;
    for (var seatLetter of seatLetters) {
      var isFound = false;
      for (var letter of this.seatsLetters) {
        if (letter.toUpperCase() == seatLetter.toUpperCase()) {
          isFound = true;
        }
      }
      if (!isFound || seatLetter.length != 1) {
        this.alertify.error(side + ": Поле \"Место для " + i + " пасажира\" не валидно");
        return false;
      }
      i++;
    }

    return true;
  }

  IsUnique(seats: string[], seatsLetters: string[]) {
    // var copyArr = seats;
    // for (seat of seats)
    var seatArr: string[] = [];
    for (var i: number = 0; i < seats.length; i++) {
      seatArr.push(seats[i] + seatsLetters[i]);
      // console.log("seatArr")
      // console.log(seats[i]+seatsLetters[i])
    }
    const duplicates = seatArr.filter((number, index, numbers) => {
      return numbers.indexOf(number) !== index;
    });
    // console.log("duplicates")
    // console.log(duplicates.length)
    // console.log(duplicates)
    if (duplicates.length == 0) {
      // console.log("true")
      return true;

    }
    // console.log("false")

    return false;
  }

  IsAdditionalBaggageWeightValid(additionalBaggageWeight: any, maxBaggageWeight: any, approvedBaggageWeight: any) {
    if (this.numberTryParse(additionalBaggageWeight) != -1 && this.numberTryParse(additionalBaggageWeight) <=
      (maxBaggageWeight - approvedBaggageWeight) * this.ticket.numberOfPassengers) {
      return true;
    }
    return false;
  }

  IsAdditionalBaggagePlacesValid(numBaggagePlaces: any, extraBaggagePlaces: any) {
    if (this.numberTryParse(numBaggagePlaces) != -1 && this.numberTryParse(numBaggagePlaces) <= extraBaggagePlaces) {
      return true;
    }
    return false;
  }

  private DataValid() {
    var result: boolean = true;
    this.fwSeatsRow = this.GetSeatsRowArray(this.fwSeatsRow, this.fwfirstSeatRow, this.fwsecondSeatRow, this.fwthirdSeatRow,
      this.fwfourthSeatRow, this.fwfifthSeatRow);
    this.fwSeatsLetters = this.GetSeatsArray(this.fwSeatsLetters, this.fwfirstSeat, this.fwsecondSeat, this.fwthirdSeat,
      this.fwfourthSeat, this.fwfifthSeat);

    if (this.IsSeatsValid(this.fwSeatsRow, this.fwSeatsLetters, this.fwSeatsInRow, "Отправление", this.fwSeatsCapacity)) {
      if (!this.IsUnique(this.fwSeatsRow, this.fwSeatsLetters)) {
        this.alertify.error("Отправление: Места пассажиров дублируются");
        return false;
      }
      if (this.fwAdditionalBaggageWeight == undefined || this.fwAdditionalBaggageWeight == ''
        || this.IsAdditionalBaggageWeightValid(this.fwAdditionalBaggageWeight, this.fwMaxBaggageWeight, this.fwDefaultBaggageWeight)) {
      } else {
        this.alertify.error("Отправление: Поле \"Перевес в кг\" не валидно");
        return false;
      }
      if (this.fwNumBaggagePlaces == undefined || this.fwNumBaggagePlaces == ''
        || this.IsAdditionalBaggagePlacesValid(this.fwNumBaggagePlaces, this.fwMaxBaggagePlaces)) {
      } else {
        this.alertify.error("Отправление: Поле \"Количество доп мест\" не валидно");
        return false;
      }
      if (!this.ticket.isOneSide) {
        this.bwSeatsRow = this.GetSeatsRowArray(this.bwSeatsRow, this.bwfirstSeatRow, this.bwsecondSeatRow, this.bwthirdSeatRow,
          this.bwfourthSeatRow, this.bwfifthSeatRow);
        this.bwSeatsLetters = this.GetSeatsArray(this.bwSeatsLetters, this.bwfirstSeat, this.bwsecondSeat, this.bwthirdSeat,
          this.bwfourthSeat, this.bwfifthSeat);
        // console.log("BW-------------------")
        if (this.IsSeatsValid(this.bwSeatsRow, this.bwSeatsLetters, this.bwSeatsInRow, "Возвращение", this.bwSeatsCapacity)) {
        } else {
          this.alertify.error("Возвращение: Не все места для пассажиров заполнены верно");
          return false;
        }
        if (!this.IsUnique(this.bwSeatsRow, this.bwSeatsLetters)) {
          this.alertify.error("Возвращение: Места пассажиров дублируются");
          return false;
        }
        if (this.bwAdditionalBaggageWeight == undefined || this.bwAdditionalBaggageWeight == ''
          || this.IsAdditionalBaggageWeightValid(this.bwAdditionalBaggageWeight, this.bwMaxBaggageWeight, this.bwDefaultBaggageWeight)) {
        } else {
          this.alertify.error("Возвращение: Поле \"Перевес в кг\" не валидно");
          return false;
        }
        if (this.bwNumBaggagePlaces == undefined || this.bwNumBaggagePlaces == ''
          || this.IsAdditionalBaggagePlacesValid(this.bwNumBaggagePlaces, this.bwMaxBaggagePlaces)) {
        } else {
          this.alertify.error("Возвращение: Поле \"Количество доп мест\" не валидно");
          return false;
        }

      }
      return true;
    }
    this.alertify.error("Отправление: Не все места для пассажиров заполнены верно");
    return false;
  }

  fwAdditionalBaggageWeight: any;
  fwNumBaggagePlaces: any;
  bwAdditionalBaggageWeight: any;
  bwNumBaggagePlaces: any;
  bwFlightData: FormGroup;
  flightDetailData: FormGroup;


  alreadyExist() {
    var a = localStorage.getItem("id");
    if (a != null) {
      return true;
    }
    return false;
  }

  ChangeMultipleBaggageValue(value: boolean) {
    this.isMultipleBaggageChecked$.pipe(take(1)).subscribe((data) => {
      this.isMultipleBaggageChecked.next(value);
    });
    // console.log("ChangeMultipleBaggageValue: this.isMultipleBaggageChecked.value")
    // console.log(this.isMultipleBaggageChecked.value);
  }

  ChangeBaggageValue(value: boolean) {
    this.isBaggageChecked$.pipe(take(1)).subscribe((data) => {
      this.isBaggageChecked.next(value);
    });
    // console.log("ChangeBaggageValue: this.isBaggageChecked.value")
    // console.log(this.isBaggageChecked.value);
  }

  get bwPassengerPlace1() {
    return this.bwFlightData.get('bwPassengerPlace1') as FormControl;
  }

  get bwPassengerPlace2() {
    return this.bwFlightData.get('bwPassengerPlace2') as FormControl;
  }

  get bwPassengerPlace3() {
    return this.bwFlightData.get('bwPassengerPlace3') as FormControl;
  }

  get bwPassengerPlace4() {
    return this.bwFlightData.get('bwPassengerPlace4') as FormControl;
  }

  get bwPassengerPlace5() {
    return this.bwFlightData.get('bwPassengerPlace5') as FormControl;
  }

  get bwPassengerPlace6() {
    return this.bwFlightData.get('bwPassengerPlace6') as FormControl;
  }

  get bwPassengerPlace7() {
    return this.bwFlightData.get('bwPassengerPlace7') as FormControl;
  }

  get bwPassengerPlace8() {
    return this.bwFlightData.get('bwPassengerPlace8') as FormControl;
  }

  get fwPassengerPlace1() {
    return this.bwFlightData.get('fwPassengerPlace1') as FormControl;
  }

  get fwPassengerPlace2() {
    return this.bwFlightData.get('fwPassengerPlace2') as FormControl;
  }

  get fwPassengerPlace3() {
    return this.bwFlightData.get('fwPassengerPlace3') as FormControl;
  }

  get fwPassengerPlace4() {
    return this.bwFlightData.get('fwPassengerPlace4') as FormControl;
  }

  get fwPassengerPlace5() {
    return this.bwFlightData.get('fwPassengerPlace5') as FormControl;
  }

  get fwPassengerPlace6() {
    return this.bwFlightData.get('fwPassengerPlace6') as FormControl;
  }

  get fwPassengerPlace7() {
    return this.bwFlightData.get('fwPassengerPlace7') as FormControl;
  }

  get fwPassengerPlace8() {
    return this.bwFlightData.get('fwPassengerPlace8') as FormControl;
  }
}
