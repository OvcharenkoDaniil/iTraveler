import {Pipe, PipeTransform} from '@angular/core';
import {IFilter} from "../model/IFilter";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {ITicket} from "../model/ITicket";
import {FlightListComponent} from "../flight/flight-list/flight-list.component";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(
    private flightList: FlightListComponent
  ) {
  }

  checkData(ticket: ITicket, filterObj: IFilter): boolean {
    if (filterObj.noTransfer == true) {
      console.log("filterObj.noTransfer")
      if (ticket.fwNumberOfTransfers !== 0 || ticket.bwNumberOfTransfers !== 0) {
        return false;
      }
    }
    if (filterObj.oneTransfer == true) {
      console.log("filterObj.oneTransfer")
      if (ticket.fwNumberOfTransfers !== 1 || ticket.bwNumberOfTransfers !== 1) {
        return false;
      }
    }
    if (filterObj.twoTransfers == true) {
      console.log("filterObj.twoTransfers")
      if (ticket.fwNumberOfTransfers === 2 || ticket.bwNumberOfTransfers === 2) {
        console.log("one of 2=2")
      } else return false;
    }

    return true;
  }


  // @ts-ignore
  transform(value: ITicket[] | null, filterObj: Observable<IFilter>): ITicket[] {
    console.log("FilterPipe value")
    console.log(value)
    console.log("FilterPipe filterObj")
    console.log(filterObj)
    var resultArray: ITicket[] | null = [];
    filterObj.pipe(take(1)).subscribe((data) => {
      console.log("FilterPipe data")
      console.log(data)
      console.log("FilterPipe value")
      console.log(value)
      if (value && data) {
        console.log("FilterPipe in if")
        //value.length === 0 ||

        console.log("FilterPipe valuevaluevalue")
        resultArray = value;

        for (const item of value) {
          if (this.checkData(item, data)) {
            resultArray.push(item);
          }
        }
        console.log("resultArray")
        console.log(resultArray)
        //return resultArray;

      } else {
        console.log("empty")
        resultArray = value;
      }
    })
    return resultArray;
  }

}
