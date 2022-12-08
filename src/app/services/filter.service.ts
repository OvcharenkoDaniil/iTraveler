import { Injectable } from '@angular/core';
import {IFilter} from "../model/IFilter";
import {take} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  // @ts-ignore
  filterObj: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>();
  filterObj$: Observable<IFilter> = this.filterObj.asObservable();

  filter(filter:IFilter){
    this.filterObj$.pipe(take(1)).subscribe((data) => {
      console.log("FILTER DATA")
      console.log(JSON.stringify(filter))
      this.filterObj.next(filter);
    });
  }
}
