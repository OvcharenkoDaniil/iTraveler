import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ITicket} from "../../model/ITicket";

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  ticket: ITicket;
  id: number;

  constructor(
    private router: ActivatedRoute,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log("detail")
    //this.ticket = this.route.snapshot.params['ticket'];
    //this.id = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
    // @ts-ignore
      (data: ITicket) => {
        return this.ticket = data['detailResolver'];
        console.log("DetailData")
        console.log(JSON.stringify(this.ticket))
      }
    );
  }

}
