import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Account, IUser, SignIn} from "../model/user";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {AlertifyService} from "../services/alertify.service";
import {Observable} from "rxjs";
import {ITicket} from "../model/ITicket";
import {OrderService} from "../services/order.service";
import {ISearchRequest} from "../model/iSearchRequest";
import {Airport} from "../model/Airport";
import {Plane} from "../model/Plane";
import {IFlight} from "../model/Flight";
import {FlightService} from "../services/flight.service";
import {PlaneService} from "../services/plane.service";
import {AirportService} from "../services/airport.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  userName: string;
  userEmail: string;
  transfer_id:number=1;
  user: IUser;
  addForm:NgForm;
  //account: Account;
  changePasswordForm: FormGroup;
  changeEmailForm: FormGroup;
  //addForm: FormGroup;
  userSubmitted: boolean;
  currentDate: any = new Date();
  selectedFromMatDate: Date;
  selectedReturnMatDate: Date;
  orders$: Observable<ITicket[]>;
  accounts$: Observable<Account[]>;
  flights$: Observable<IFlight[]>;
  airports$: Observable<Airport[]>;
  planes$: Observable<Plane[]>;
  mode: string = "order";
  profileItem = "profile";
  orderItem = "orders";
  accountItem = "accounts";
  addItem = "addItem";
  activeMenuItem: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private airportService: AirportService,
    private orderService: OrderService,
    private flightService: FlightService,
    private planeService: PlaneService,
    private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    //this.createAddForm();
    this.activeMenuItem = this.profileItem;
    console.log("SetItem")
    console.log(this.activeMenuItem)
    this.createChangePasswordForm();
    this.createChangeEmailForm();
    if (this.isAdmin()) {
      this.adminInit()
    }else this.UserOrders(this.user.email);

  }

  userInit() {
    //var user:IUser = this.authService.getUserData();

    console.log("userInit------------------------ ")
    console.log(this.user)
      this.orderService.getOrders(this.user.email).subscribe(
        response => {
          console.log("response orderService.GetOrders ")
          console.log(response)
        }, error => {
          //this.alertify.error('Order does not get');
        }
      );
      this.orders$ = this.orderService.orders

  }

  adminInit() {
    console.log("adminInit------------------------ ")
    this.accountService.getAllAccounts().subscribe(
      response => {}, error => {});
    this.airportService.getAllAirports().subscribe(
      response => {}, error => {});
    this.planeService.getAllPlanes().subscribe(
      response => {}, error => {});
    // this.flightService.getAllFlights().subscribe(
    //   response => {}, error => {});
    this.accounts$ = this.accountService.accounts
    this.airports$ = this.airportService.airports
    this.planes$ = this.planeService.planes
    // this.flights$ = this.flightService.flights

  }

  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null, Validators.required],
      newPassword: [null, [Validators.required, Validators.minLength(5)]],
      //mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, {validators: this.passwordMatchingValidatior});
  }
  createChangeEmailForm() {
    this.changeEmailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  passwordMatchingValidatior(fg: FormGroup): Validators {
    // @ts-ignore
    return fg.get('newPassword').value === fg.get('confirmPassword').value ? null :
      {notmatched: true};
  }

  DeleteAccount(account: Account) {
    console.log("DeleteAccount------------------------ ")
    console.log(account)
    this.orderService.GetAllOrders().subscribe(
      orderList => {
        for (const order of orderList) {
          if (order.user_id == account.account_id) {
            console.log("DeleteOrder------------------------ ")
            console.log(order.user_id)
            console.log(account.account_id)
            this.orderService.DeleteOrder(order.order_id)
              .subscribe(
                response => {

                }, error => {
                }
              );
            this.adminInit();
          }
        }
        this.UserOrders(account.email)
        this.accountService.DeleteAccount(account.email).subscribe(
          response => {

          }, error => {
            //this.alertify.error('Order does not get');
          }
        );
      }, error => {
      }
    );


  }
  UserOrders(email: string){
    // var user:IUser = new IUser();
    // user.email = account.email;
    // user.role = account.role.toString();
    // user.name = account.firstName;
    // user.family_name = account.secondName;
    // user.phonenumber = account.phoneNumber;

    this.orderService.getOrders(email).subscribe(
      response => {

      }, error => {
        //this.alertify.error('Order does not get');
      }
    );
    this.orders$ = this.orderService.orders

  }

  changePassword() {
    this.userSubmitted = true;
    if (this.changePasswordForm.valid) {
      //this.user = Object.assign(this.user, this.changePasswordForm.value);

      this.accountService.changePassword(this.password.value, this.newPassword.value).subscribe(
        response => {

        }, error => {
          this.alertify.error('Пароль не изменен');
        });

      this.userSubmitted = false;
    } else {
      this.alertify.error("Введенные данные не коректны");
    }
  }
  changeEmail() {
    this.userSubmitted = true;
    if (this.changeEmailForm.valid) {
      //this.user = Object.assign(this.user, this.changePasswordForm.value);

      this.accountService.changeEmail(this.email.value, this.user.email).subscribe(
        response => {
          this.authService.UpdateUserEmail(this.email.value);
        }, error => {
          this.alertify.error('Email не изменен');
        });

      this.userSubmitted = false;
    } else {
      this.alertify.error("Введенные данные не коректны");
    }
  }

  isAdmin() {
    //return this.authService.isAdmin()
    if (this.user.role =="Admin"){
      return true;
    }
    else return false;
  }

  // loggedIn() {
  //   // @ts-ignore
  //   this.user = ;
  //
  //   return this.user;
  // }

  get password() {
    return this.changePasswordForm.get('password') as FormControl;
  }
  get email() {
    return this.changeEmailForm.get('email') as FormControl;
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword') as FormControl;
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword') as FormControl;
  }
  // get departureTime() {
  //   return this.addForm.get('departureTime') as FormControl;
  // }


  SetItem(item: string) {
    this.activeMenuItem = item;
    console.log("SetItem")
    console.log(this.activeMenuItem)
  }

  onReset() {
    this.userSubmitted = false;
    //this.addForm.reset();
  }


  // addWithForm(addForm:NgForm) {
  //   console.log("addWithForm")
  //   var flight:IFlight = addForm.value;
  //
  //   this.userSubmitted = true;
  //   if (addForm.valid) {
  //     flight.transfer_id=this.transfer_id;
  //     console.log("addForm")
  //     console.log(addForm.value)
  //     console.log("departureDate-----------------")
  //     console.log(flight.departureDate)
  //     console.log("arrivalDate---------------")
  //     console.log(flight.arrivalDate)
  //     flight.departureDate.setDate(flight.departureDate.getDate() + 1);
  //     flight.arrivalDate.setDate(flight.arrivalDate.getDate() + 1);
  //     console.log("departureDate")
  //     console.log(flight.departureDate)
  //     console.log("arrivalDate")
  //     console.log(flight.arrivalDate)
  //     this.flightService.AddFlight(addForm.value).subscribe(
  //       response => {
  //         if (response) {
  //         this.alertify.success('Рейс добавлен');
  //
  //         }
  //       }, error => {
  //         this.alertify.error('Ошибка добавления. Некорректные данные');
  //       }
  //     );
  //     this.userSubmitted = false;
  //   }
  //   else this.alertify.error('Перепроверьте введенную информацию');
  // }

  // private createAddForm() {
  //   this.addForm = this.fb.group({
  //     departureAirport_id: [null, [Validators.required]],
  //     departureTime: [null, [Validators.required]],
  //     arrivalTime: [null, [Validators.required]],
  //     arrivalAirport_id: [null, [Validators.required]],
  //     price: [null, [Validators.required]],
  //     plane_id: [null, [Validators.required]],
  //     flightDuration: [null, [Validators.required]],
  //     firstClassTicketsLeft: [null, [Validators.required]],
  //     standardClassTicketsLeft: [null, Validators.required]
  //
  //   });
  // }
  DeletePlane(plane: Plane) {

  }

  DeleteAirport(airport: Airport) {

  }


}
