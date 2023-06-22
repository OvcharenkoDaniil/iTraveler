import { Pipe, PipeTransform } from '@angular/core';
import {ITicket} from "../model/ITicket";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: ITicket[] | null, args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;

    // const fwFD = "fwFlight.flightDurationInHours";
    // const bwFD = "bwFlight.flightDurationInHours";
    // console.log("const values")
    // console.log(fwFD)
    // console.log(bwFD)


    // if (sortField == "flightDuration") {
    //   if (value) {
    //     //console.log("inside flightDuration sort value")
    //     value.sort((a: any, b: any) => {
    //       console.log("аааа:"+(+a[fwFD]) + (+a[bwFD]))
    //       console.log("bbbb:"+(+b[fwFD]) + (+b[bwFD]))
    //       //   if (
    //       //     ((+a[fwFD]) + (+a[bwFD])) < ((+b[fwFD]) + (+b[bwFD]))
    //       //   ) {
    //           if (
    //           ((+a[fwFD]) + (+a[bwFD])) < ((+b[fwFD]) + (+b[bwFD]))
    //         ) {
    //           //console.log("-1 * multiplier ")
    //
    //
    //           return -1 * multiplier;
    //         } else if (
    //           ((+a[fwFD]) + (+a[bwFD])) > ((+b[fwFD]) + (+b[bwFD]))
    //         ) {
    //           //console.log("1 * multiplier ")
    //
    //           return 1 * multiplier;
    //         } else {
    //           return 0;
    //         }
    //       }
    //
    //
    //     );
    //     // console.log(" RESULTTTTTTTTTTTTTTTT")
    //     // console.log(JSON.stringify(value))
    //     return value;
    //   }
    // }

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    if (value) {
      value.sort((a: any, b: any) => {
          if (a[sortField] < b[sortField]) {
            return -1 * multiplier;
          } else if (a[sortField] > b[sortField]) {
            return 1 * multiplier;
          } else {
            return 0;
          }
        }
      );
      return value;
    }}

}
