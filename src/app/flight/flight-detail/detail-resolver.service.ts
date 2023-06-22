import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {ITicket} from "../../model/ITicket";
import {TicketService} from "../../services/ticket.service";

import {catchError} from "rxjs/operators";
import { Observable, of } from 'rxjs';
import {OrderService} from "../../services/order.service";
@Injectable({
  providedIn: 'root'
})


export class DetailResolverService implements Resolve<ITicket> {

  constructor(private router: Router, private ticketService: TicketService,private orderService: OrderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITicket> | ITicket {
    const obj = route.params['obj'];
    const id = route.params['id'];
    console.log("resolve get ticket")
    console.log(obj+'+'+id)
    if (obj==="order"){
      console.log("YYYYYYYYYYYESSS")
      return this.orderService.getOrder(+id);
    }

    return this.ticketService.getTicket(+id)
      // .pipe(
      // catchError(error => {
      //   this.router.navigate(['/']);
      //   return of(null);
      // })
        //)
      ;
  }
}
