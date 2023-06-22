import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ITicket} from "../model/ITicket";
import {Order} from "../model/IOrder";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IPlace} from "../model/Place";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  GET_ALL_PLACES = "api/Place/GetAllPlaces";
  val: IPlace[];
  // @ts-ignore
  places: BehaviorSubject<IPlace[]> = new BehaviorSubject<IPlace[]>();
  places$: Observable<IPlace[]> = this.places.asObservable();
  basePlacesValue:IPlace[];
  constructor(private http : HttpClient) { }
  SplitString(str:string,symbol:string){
    str=str.trim();
    if (str[str.length-1]==','){
      str=str.slice(0, -1);
    }
    return str.split(symbol);
  }
  SetPlacesValue(value:IPlace[]){
    this.places$.pipe(take(1)).subscribe((data) => {
      this.places.next(value);
    });
  }
  GetAllPlaces() {
    return this.http.get<IPlace[]>(environment.BASE_URL+this.GET_ALL_PLACES).pipe(
      tap(data=>{
        this.val = data;
        this.basePlacesValue = this.val;
        this.SetPlacesValue(this.val);
        // this.places$.pipe(take(1)).subscribe((data) => {
        //   console.log("Places data-------------");
        //   console.log(JSON.stringify(this.val));
        //   this.places.next(this.val);
        // });

      })
    )
  }
}
