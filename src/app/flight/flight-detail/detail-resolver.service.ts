import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {ITicket} from "../../model/ITicket";
import {TicketService} from "../../services/ticket.service";

import {catchError} from "rxjs/operators";
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class DetailResolverService implements Resolve<ITicket> {

  constructor(private router: Router, private ticketService: TicketService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITicket> | ITicket {
    const ticketId = route.params['id'];
    return this.ticketService.getTicket(+ticketId).pipe(
      catchError(error => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
