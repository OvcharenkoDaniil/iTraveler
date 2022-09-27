import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { FlightCardComponent } from './flight/flight-card/flight-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import {FlightService} from "./services/flight.service";
@NgModule({
  declarations: [
    AppComponent,
    FlightCardComponent,
    NavBarComponent,
    FlightListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
