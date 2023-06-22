import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FlightVM} from "../../model/FlightVM";
import {BehaviorSubject, Observable} from "rxjs";
import {AlertifyService} from "../../services/alertify.service";
import {FlightCardComponent} from "../../flight/flight-card/flight-card.component";
import {FlightDetailComponent} from "../../flight/flight-detail/flight-detail.component";
import {take} from "rxjs/operators";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-baggage-card',
  templateUrl: './baggage-card.component.html',
  styleUrls: ['./baggage-card.component.css']
})
export class BaggageCardComponent implements OnInit, DoCheck,AfterViewInit {
  @Input() flight: FlightVM;
  @Input() flightClass: string;
  @Input() isBaggageChecked: BehaviorSubject<boolean>;
  // @ViewChild('baggage') baggage: HTMLInputElement;
  // @ViewChild('baggage', {static: true})
  baggage: HTMLInputElement;

  // @Output() isBaggageChecked = new EventEmitter();

  constructor(private flightDetail: FlightDetailComponent) {
    // this.baggage = {} as HTMLInputElement;
  }

  // isBaggageChecked$: BehaviorSubject<boolean>;
  baggageWeight: number;
  maxBaggagePlaces: number;

  ngDoCheck() {
    // console.log("baggage"+this.isBaggageChecked.value)
    // if (this.baggage!=undefined)
    // this.baggage.checked = this.isBaggageChecked.value;
  }
  ngAfterViewInit() {
    // console.log("this.baggage");
    // console.log(this.baggage.checked);
  }

  ngOnInit(): void {
    // this.isBaggageChecked$ = this.flightDetail.isBaggageChecked;

    // console.log(this.baggage.checked);
    // console.log("this.baggage");
    // this.baggage.checked = this.isBaggageChecked.value;


    // this.isMultipleBaggageChecked$ = this.flightDetail.isMultipleBaggageChecked;
    if (this.flightClass == "StandardClass") {
      this.baggageWeight = this.flight.standardBaggageWeight;
      this.maxBaggagePlaces = this.flight.standardBaggagePlacesForPerson;
    } else if (this.flightClass == "BusinessClass") {
      this.baggageWeight = this.flight.businessBaggageWeight;
      this.maxBaggagePlaces = this.flight.businessBaggagePlacesForPerson;
    }
  }

  SetBaggageValue() {
    // baggage.checked = this.flightDetail.isBaggageChecked.value;
    if (!this.isBaggageChecked.value) {
      // console.log("In !this.baggage.checked");
      this.flightDetail.ChangeMultipleBaggageValue(false);
      this.flightDetail.ChangeBaggageValue(true);
      // console.log("In bag after bag:true");
      // console.log(this.isBaggageChecked.value);
    }
    // else{
    //   baggage.checked=true;
    //   this.isChecked =true;
    // }
    // this.isBaggageChecked.emit(this.isChecked);
  }
}
