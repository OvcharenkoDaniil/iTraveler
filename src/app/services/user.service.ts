import {Injectable} from "@angular/core";
import {Token} from "../model/token";
import {tap} from "rxjs";
import {ACCESS_TOKEN_KEY, AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {IUser, RegisterVM, SignIn} from "../model/user";
import {AlertifyService} from "./alertify.service";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  BASE_URL = "https://localhost:7138/";
  CHANGE_PASSWORD = "api/auth/ChangePassword";
  LOGIN = "";
  //GET_FLIGHTS = "api/Flight";
  CHANGE_USER = "api/auth/login";

  constructor(
    private authService:AuthService,
    private http : HttpClient,
    private alertify: AlertifyService
  ) {
  }
  // @ts-ignore
  // addUser(user) {
  //   let users = [];
  //   if (localStorage.getItem('Users')) {
  //     // @ts-ignore
  //     users = JSON.parse(localStorage.getItem('Users'));
  //     users = [user, ...users];
  //   }
  //   else {
  //     users = [user];
  //   }
  //   localStorage.setItem('Users',JSON.stringify(users));
  // }

  changePassword(password: string, newPassword:string) {
    console.log("changePassword PuT------------------------")
    var user:IUser = this.authService.getUserData();
    var userData = new SignIn()
    userData.password = password
    userData.email = user.email
    userData.newPassword = newPassword
    console.log("userData");
    console.log(userData);
    return this.http.put<Boolean>(this.BASE_URL+this.CHANGE_PASSWORD,userData).pipe(
      tap(data=>{
        console.log("changePassword PuT------------------------")
        console.log(data)
        this.alertify.success('Пароль изменен успешно');
      })
    )
  }

  // changePassword(password: string) {
  //   // @ts-ignore
  //   var user = JSON.parse(localStorage.getItem('User'));
  //   return this.http.post(this.BASE_URL+this.CHANGE_PASSWORD,password).pipe(
  //     tap(token=>{
  //
  //     })
  //   )
  // }


}
