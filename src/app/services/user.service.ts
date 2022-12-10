import {Injectable} from "@angular/core";
import {Token} from "../model/token";
import {tap} from "rxjs";
import {ACCESS_TOKEN_KEY} from "./auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  BASE_URL = "https://localhost:7138/";
  CHANGE_PASSWORD = "   ";
  LOGIN = "";
  //GET_FLIGHTS = "api/Flight";
  CHANGE_USER = "api/auth/login";

  constructor(
    private http : HttpClient
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


  changePassword(password: string) {
    // @ts-ignore
    var user = JSON.parse(localStorage.getItem('User'));
    return this.http.post(this.BASE_URL+this.CHANGE_PASSWORD,password).pipe(
      tap(token=>{
        //localStorage.setItem(ACCESS_TOKEN_KEY,token.access_token);
        //var decode = this.jwtHelper.decodeToken(token.access_token);
        //this.user = decode;
        //localStorage.setItem("User",JSON.stringify(this.user));
        //localStorage.setItem("UserRole",this.user.role);

        //var decode = jwt.verify(token.access_token,"secretKey12345677890+-");
        //console.log("DECODE------------------------")
        //console.log(this.user)
      })
    )
  }


}
