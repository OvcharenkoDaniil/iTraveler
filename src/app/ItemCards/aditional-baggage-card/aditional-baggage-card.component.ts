import {AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FlightVM} from "../../model/FlightVM";
import {BehaviorSubject} from "rxjs";
import {FlightDetailComponent} from "../../flight/flight-detail/flight-detail.component";

@Component({
  selector: 'app-aditional-baggage-card',
  templateUrl: './aditional-baggage-card.component.html',
  styleUrls: ['./aditional-baggage-card.component.css']
})
export class AditionalBaggageCardComponent implements OnInit,DoCheck,AfterViewInit {
  isChecked:boolean=false;
  @Input() flight: FlightVM;
  @Input() flightClass: string;
  @Input() isMultipleBaggageChecked: BehaviorSubject<boolean>;

  // @ViewChild('multipleBaggage', { static: true})
  multipleBaggage: HTMLInputElement;
  baggageWeight: number;
  // isMultipleBaggageChecked$: BehaviorSubject<boolean>;
  maxBaggagePlaces: number;
  maxExtraBaggagePlaces: number;
  extraBaggagePrice: number;

  constructor(private flightDetail: FlightDetailComponent) {
    // this.multipleBaggage = {} as HTMLInputElement;
  }
  ngDoCheck() {
    // console.log("multipleBaggage"+this.isMultipleBaggageChecked.value)
    // if (this.multipleBaggage!=undefined)
    // this.multipleBaggage.checked = this.isMultipleBaggageChecked.value;
  }
  ngAfterViewInit() {
    // console.log("this.multipleBaggage");
    // console.log(this.multipleBaggage.checked);
  }
  ngOnInit(): void {
    // this.isMultipleBaggageChecked$ = this.flightDetail.isMultipleBaggageChecked;
    // console.log("this.multipleBaggage");
    // // this.multipleBaggage.checked = this.isMultipleBaggageChecked.value;
    // console.log(this.multipleBaggage.checked);

    this.extraBaggagePrice = this.flight.extraBaggagePrice;

    if (this.flightClass=="StandardClass"){
      this.baggageWeight = this.flight.standardBaggageWeight;
      this.maxBaggagePlaces = this.flight.standardBaggagePlacesForPerson;
    }else if (this.flightClass=="BusinessClass"){
      this.baggageWeight = this.flight.businessBaggageWeight;
      this.maxBaggagePlaces = this.flight.businessBaggagePlacesForPerson;
    }


    this.maxExtraBaggagePlaces = this.flight.maxExtraBaggagePlacesForPerson;
    // this.maxExtraBaggagePlaces = this.flight.maxExtraBaggagePlacesForPerson-this.maxBaggagePlaces;
  }

  SetBaggageValue() {
    // multipleBaggage.checked = this.flightDetail.isMultipleBaggageChecked.value;
    // console.log("!multipleBaggage.checked && this.isBaggageChecked$.value");
    // // console.log(!multipleBaggage.checked);
    // console.log(this.flightDetail.isBaggageChecked.value);
    if (!this.isMultipleBaggageChecked.value)
    {
      // console.log("In !this.multipleBaggage.checked");
      // multipleBaggage.checked=true;
      this.flightDetail.ChangeMultipleBaggageValue(true);
      this.flightDetail.ChangeBaggageValue(false);
      // console.log("In multiple after mul:true");
      // console.log(this.isMultipleBaggageChecked.value);
    }
    // else{
    //   multipleBaggage.checked=true;
    //   this.isChecked =true;
    // }
    // this.isMultipleBaggageChecked.emit(this.isChecked);
  }
}
