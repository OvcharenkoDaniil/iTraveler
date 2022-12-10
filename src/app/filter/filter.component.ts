import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {BehaviorSubject, Observable} from "rxjs";

import {ITicket} from "../model/ITicket";
import {IFilter} from "../model/IFilter";
import {take} from "rxjs/operators";
import {FilterService} from "../services/filter.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent  {
  sliderModel=24;
  noTransfer= false;
  oneTransfer= false;
  twoTransfers= false;
  minPrice: number;
  maxPrice: number;


  constructor(
    private filterService:FilterService
  ) { }



  formatLabel(value: number) {
    return value;
  }

  filterParams() {

    //ADD PRICE
    var filterObj = new IFilter();
    filterObj.sliderValue=this.sliderModel;
    filterObj.noTransfer=this.noTransfer;
    filterObj.oneTransfer=this.oneTransfer;
    filterObj.twoTransfers=this.twoTransfers;
    this.filterService.filter(filterObj);
  }
}
