import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser, RegisterVM, SignIn} from "../model/user";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Token} from "../model/token";
import {ITicket} from "../model/ITicket";
import {take} from "rxjs/operators";
import {environment} from "../../environments/environment";

export const ACCESS_TOKEN_KEY = "access_token"
export const TICKETLIST = "ticket_list"
export const FILTER = "filter"
//export const User = "User"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //BASE_URL = "https://localhost:7138/";
  LOGIN = "api/auth/login";
  REGISTER = "api/auth/register";
  //user: IUser;
  // @ts-ignore
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>();
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  // @ts-ignore
  User: BehaviorSubject<IUser> = new BehaviorSubject<IUser>();
  User$: Observable<IUser> = this.User.asObservable();

  constructor(
    private http : HttpClient,
    private jwtHelper:JwtHelperService,
    private router:Router
  ) { }
  Register(registerData: RegisterVM) {
        console.log("Register POST------------------------")
    return this.http.post<Boolean>(environment.BASE_URL+this.REGISTER,registerData).pipe(
      tap(data=>{
        console.log("Register POST------------------------")
        console.log(data)

      })
    )
  }
  login(loginData:SignIn):Observable<Token>{
    // console.log("loginData------------------------")
    // console.log(loginData)
    return this.http.post<Token>(environment.BASE_URL+this.LOGIN,loginData).pipe(
      tap(token=>{
        localStorage.setItem(ACCESS_TOKEN_KEY,"Exist");
        environment.jwtToken = token.access_token;
        console.log(environment.jwtToken)
        // localStorage.setItem(ACCESS_TOKEN_KEY,token.access_token);
        var decode = this.jwtHelper.decodeToken(token.access_token);
        //this.user = decode;
        //localStorage.setItem(User,JSON.stringify(decode));

        this.User$.pipe(take(1)).subscribe((data) => {
          var user: IUser = decode;
          //user.role = data.role;
          this.User.next(user);
        });
        this.isAdmin();
        this.isLoggedIn$.pipe(take(1)).subscribe((data) => {
          data = true;
          // console.log("loginData------------------------")
          // console.log(data)
          this.isLoggedIn.next(data);
        });
      })
    )
  }

  isAuthenticated():boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    // @ts-ignore
    if (token ==null){
    return false
    }
    return true
      //&& !this.jwtHelper.isTokenExpired(token)
  }

  isAdmin() {
    if (this.isAuthenticated()) {
      var res:boolean = false;
      // @ts-ignore

      // this.User$.pipe(take(1)).subscribe((user) => {
      // if (user.role=='Admin'){
      //   console.log("Admin")
      //   res = true;
      // }
      // });
    }

    // @ts-ignore
    return res;
  }

  getUserData(){
    // @ts-ignore
      var user:IUser;
    this.User$.pipe(take(1)).subscribe((userData) => {
      user = userData;
    });

    // @ts-ignore
    return user;
  }
  clearAllData(){
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    //localStorage.removeItem(User);
    localStorage.removeItem(FILTER);
    //localStorage.removeItem(User);
    localStorage.removeItem(TICKETLIST);
  }
  logout():void{
    this.clearAllData();
    this.isLoggedIn$.pipe(take(1)).subscribe((data) => {
      console.log("logout------------------------")

      data =false;
       console.log(data)
      this.isLoggedIn.next(data);
    });
    this.router.navigate(['']);
  }


}
