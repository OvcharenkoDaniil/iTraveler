import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser, SignIn, UserForRegister} from "../model/user";
import {Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {Token} from "../model/token";

export const ACCESS_TOKEN_KEY = "access_token"
export const User = "User"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = "https://localhost:7138/";
  //GET_FLIGHTS = "api/Flight";
  LOGIN = "api/auth/login";
  user: IUser;
  //ACESS_TOKEN = "access_token";

  constructor(
    private http : HttpClient,
    private jwtHelper:JwtHelperService,
    private router:Router
  ) { }

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

  getUserData(){
    // @ts-ignore
    var user = JSON.parse(localStorage.getItem(User));
    return user;
  }

  logout():void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }

  authUser(user: SignIn) {
    //return this.http.post(this.baseUrl + '/account/login', user);
  }

  registerUser(user: UserForRegister) {
    //return this.http.post(this.baseUrl + '/account/register', user);
  }
}
