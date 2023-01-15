import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ITicket} from "../model/ITicket";
import {Plane} from "../model/Plane";
import {IFlight} from "../model/Flight";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  // @ts-ignore
  planes: BehaviorSubject<Plane[]> = new BehaviorSubject<Plane[]>();
  planes$: Observable<Plane[]> = this.planes.asObservable();

  constructor( private http: HttpClient) { }

  //BASE_URL = "https://localhost:7138/";
  GET_PLANES = "api/Plane/GetPlanes";

  getAllPlanes() {
    return this.http.get<Plane[]>(environment.BASE_URL+this.GET_PLANES).pipe(
      tap(planes=>{
        console.log(planes)
        this.planes$.pipe(take(1)).subscribe((data) => {
          this.planes.next(planes);
        });
      })
    )
  }

}
