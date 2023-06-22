import {Injectable} from "@angular/core";
import {Token} from "../model/token";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ACCESS_TOKEN_KEY, AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Account, AccountEmailData, IUser, RegisterVM, SignIn} from "../model/user";
import {AlertifyService} from "./alertify.service";
import {ITicket} from "../model/ITicket";
import {take} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService{

  //BASE_URL = "https://localhost:7138/";
  CHANGE_PASSWORD = "api/Account/ChangePassword";
  CHANGE_EMAIL = "api/Account/ChangeEmail";
  GET_ALL_ACCOUNTS = "api/Account/GetAllAccounts";
  DELETE_ACCOUNT = "api/Account/DeleteAccount";

  user:IUser;
  // @ts-ignore
  accounts: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>();
  accounts$: Observable<Account[]> = this.accounts.asObservable();

  constructor(
    private authService:AuthService,
    private http : HttpClient,
    private alertify: AlertifyService
  ) {
  }
  // @ts-ignore
  changePassword(password: string, newPassword:string) {
    console.log("changePassword PuT------------------------")
    var user:IUser = this.authService.getUserData();
    var userData = new SignIn()
    userData.password = password
    userData.email = user.email
    userData.newPassword = newPassword
    console.log("userData");
    console.log(userData);
    return this.http.put<Boolean>(environment.BASE_URL+this.CHANGE_PASSWORD,userData).pipe(
      tap(data=>{
        console.log("changePassword PuT------------------------")
        console.log(data)
        this.alertify.success('Пароль изменен успешно');
      })
    )
  }

  changeEmail(newEmail: string,email: string) {
    var userData = new AccountEmailData()
    userData.email = email
    userData.newEmail = newEmail
    return this.http.post<Boolean>(environment.BASE_URL + this.CHANGE_EMAIL,userData)
      .pipe(
        tap(result => {
          this.alertify.success('Email изменен успешно');

        })
      )
  }
  getAllAccounts(){

    console.log("getAllAccounts-------------");
    return this.http.get<Account[]>( environment.BASE_URL + this.GET_ALL_ACCOUNTS)
      .pipe(
        tap(result => {
          console.log("accounts:");
          console.log(result);

          this.accounts$.pipe(take(1)).subscribe((data) => {
            this.accounts.next(result);
          });

        })
      )

  }

  DeleteAccount(email:string) {
    var userData = new AccountEmailData()
    userData.email = email
    userData.newEmail = email
    return this.http.post<Boolean>(environment.BASE_URL + this.DELETE_ACCOUNT,userData)
      .pipe(
        tap(result => {

        })
      )
  }
}
