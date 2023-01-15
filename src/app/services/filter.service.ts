import { Injectable } from '@angular/core';
import {IFilter} from "../model/IFilter";
import {take} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {ISearchRequest} from "../model/iSearchRequest";
import {IUser} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  // @ts-ignore
  filterObj: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>();
  filterObj$: Observable<IFilter> = this.filterObj.asObservable();

  // @ts-ignore
  ISearchRequestObj: BehaviorSubject<ISearchRequest> = new BehaviorSubject<ISearchRequest>();
  ISearchRequestObj$: Observable<ISearchRequest> = this.ISearchRequestObj.asObservable();


  filter(filter:IFilter){
    this.filterObj$.pipe(take(1)).subscribe((data) => {
      console.log("FilterService DATA")
      console.log(JSON.stringify(filter))
      this.filterObj.next(filter);
    });
  }

  getsearchRequestData(){
    // @ts-ignore
    var searchRequest:ISearchRequest;
    this.ISearchRequestObj$.pipe(take(1)).subscribe((searchRequestData) => {
      searchRequest = searchRequestData;
    });
    // @ts-ignore
    return searchRequest;
  }

  AddSearchRequest(searchRequest: ISearchRequest) {
    this.ISearchRequestObj$.pipe(take(1)).subscribe((data) => {
      this.ISearchRequestObj.next(searchRequest);
    });
  }
}
