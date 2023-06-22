import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Plane} from "../model/Plane";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {Airport} from "../model/Airport";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  // @ts-ignore
  airports: BehaviorSubject<Airport[]> = new BehaviorSubject<Airport[]>();
  airports$: Observable<Airport[]> = this.airports.asObservable();

  constructor( private http: HttpClient) { }

  //BASE_URL = "https://localhost:7138/";
  GET_AIRPORTS = "api/Airport/GetAirports";

  getAllAirports() {
    return this.http.get<Airport[]>(environment.BASE_URL+this.GET_AIRPORTS).pipe(
      tap(airports=>{
        this.airports$.pipe(take(1)).subscribe((data) => {
          this.airports.next(airports);
        });
      })
    )
  }
}
