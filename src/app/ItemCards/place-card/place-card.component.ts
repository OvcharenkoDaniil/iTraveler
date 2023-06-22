import {Component, Input, OnInit} from '@angular/core';
import {ITicket} from "../../model/ITicket";
import {IPlace} from "../../model/Place";

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {
  @Input() place: IPlace;
  placeNamePng:any;
  constructor() { }

  ngOnInit(): void {
    this.placeNamePng=this.place.placeName+".jpg"
  }

}
