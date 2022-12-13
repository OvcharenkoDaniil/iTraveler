import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser, RegisterVM, SignIn} from "../model/user";
import {Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Token} from "../model/token";

export const ACCESS_TOKEN_KEY = "access_token"
export const TICKETLIST = "ticket_list"
export const FILTER = "filter"
export const User = "User"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = "https://localhost:7138/";
  //GET_FLIGHTS = "api/Flight";
  LOGIN = "api/auth/login";
  REGISTER = "api/auth/register";
  user: IUser;
  //ACESS_TOKEN = "access_token";

  constructor(
    private http : HttpClient,
    private jwtHelper:JwtHelperService,
    private router:Router
  ) { }
  Register(registerData: RegisterVM) {
        console.log("Register POST------------------------")
    return this.http.post<Boolean>(this.BASE_URL+this.REGISTER,registerData).pipe(
      tap(data=>{
        console.log("Register POST------------------------")
        console.log(data)

      })
    )
  }
  login(loginData:SignIn):Observable<Token>{
    // console.log("loginData------------------------")
    // console.log(loginData)
    return this.http.post<Token>(this.BASE_URL+this.LOGIN,loginData).pipe(
      tap(token=>{
        localStorage.setItem(ACCESS_TOKEN_KEY,token.access_token);
        var decode = this.jwtHelper.decodeToken(token.access_token);
        this.user = decode;
        localStorage.setItem(User,JSON.stringify(this.user));
        //localStorage.setItem("UserRole",this.user.role);

        //var decode = jwt.verify(token.access_token,"secretKey12345677890+-");
        //console.log("DECODE------------------------")
        //console.log(this.user)
      })
    )
  }

  isAuthenticated():boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    // console.log("token----------")
    // console.log(token)
    // // @ts-ignore
    // var res = token && !this.jwtHelper.isTokenExpired(token)
    // console.log("RESULT----------")
    // console.log(res)
    // @ts-ignore
    return token && !this.jwtHelper.isTokenExpired(token)
  }

  isAdmin() {
    if (this.isAuthenticated()) {
      // @ts-ignore
      var user = this.getUserData();
      if (user.role=='Admin'){
        //console.log("auth service isAdmin ----------")

        return true;
      }

    }
    return false;
  }

  getUserData(){
    // @ts-ignore
    var user = JSON.parse(localStorage.getItem(User));
    return user;
  }
  clearAllData(){
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(User);
    localStorage.removeItem(FILTER);
    localStorage.removeItem(User);
    localStorage.removeItem(TICKETLIST);
  }
  logout():void{
    this.clearAllData();
    this.router.navigate(['']);
  }

  authUser(user: SignIn) {
    //return this.http.post(this.baseUrl + '/account/login', user);
  }



}
