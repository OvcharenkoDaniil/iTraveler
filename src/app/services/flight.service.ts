import { Injectable } from '@angular/core';
import {Order, OrderVM} from "../model/IOrder";
import {IFlight} from "../model/Flight";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Plane} from "../model/Plane";
import {take} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  // @ts-ignore
  flights: BehaviorSubject<IFlight[]> = new BehaviorSubject<IFlight[]>();
  flights$: Observable<IFlight[]> = this.flights.asObservable();

  constructor(private http: HttpClient) { }

  //BASE_URL = "https://localhost:7138/";
  ADD_FLIGHT = "api/Flight/AddFlight";
  GET_FLIGHTS = "api/Flight/GetFlights";

  AddFlight(flightData:IFlight) {
    console.log("AddFlight-------------");
    console.log(JSON.stringify(flightData));
    // @ts-ignore
    return this.http.post<Boolean>(environment.BASE_URL+this.ADD_FLIGHT,flightData);
  }


  getAllFlights() {
    return this.http.get<IFlight[]>(environment.BASE_URL+this.GET_FLIGHTS).pipe(
      tap(data=>{
        this.flights$.pipe(take(1)).subscribe((data) => {
          this.flights.next(data);
        });
      })
    )
  }


}
