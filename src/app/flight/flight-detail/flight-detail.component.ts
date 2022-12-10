import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ITicket} from "../../model/ITicket";
import {TicketService} from "../../services/ticket.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  ticket: ITicket;
  id: number;
  read=false;
  nameee: string;

  constructor(
    private router: ActivatedRoute,
    private route: ActivatedRoute,
    private ticketService:TicketService,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {
    console.log("detail")
    //this.ticket = this.route.snapshot.params['ticket'];
    this.id = +this.route.snapshot.params['id'];
    console.log(this.id)
    this.ticket = this.ticketService.getTicket(this.id);
    // this.route.data.subscribe(
    // // @ts-ignore
    //   (data: ITicket) => {
    //     return this.ticket = data['detailResolver'];
    //     console.log("DetailData")
    //     console.log(JSON.stringify(this.ticket))
    //   }
    // );
  }

  isAdmin() {
    if (this.authService.isAdmin()){
      this.read=true;
      return true;
    }
      return false;
  }

  SaveChanges() {
    console.log("this.ticket")
    console.log(this.ticket)
    // return this.ticketService.UpdateTicket(this.ticket).subscribe(
    //   response => {
    //     // this.alertify.success('Tickets received');
    //     if (response!=null){
    //       console.log("SaveChanges() executed")
    //     }
    //   }, error =>{
    //     // this.alertify.error('Tickets does not received');
    //   }
    // )
    //   ;
  }
}
