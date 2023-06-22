import {FlightVM} from "./FlightVM";

export interface ITicket {
  bwFlight:FlightVM;
  fwFlight:FlightVM;

  ticketElem_id: number;
  isOneSide: boolean;
  flightClass: string;
  totalFlightDuration: number;
  numberOfPassengers: number;
  totalPrice: number;
  order_id: number;
  bwMaxBaggageWeight: number;
  bwStandardBaggageWeight: number;
  bwBusinessBaggageWeight: number;
  bwStandardhandLuggageWeight: number;
  bwBusinesshandLuggageWeight: number;
  fwMaxBaggageWeight: number;
  fwStandardBaggageWeight: number;
  fwBusinessBaggageWeight: number;
  fwStandardhandLuggageWeight: number;
  fwBusinesshandLuggageWeight: number;

  fwExtraBaggagePrice: number;
  fwMaxExtraBaggagePlacesForPerson: number;
  fwBaggageSurchargePrice: number;
  fwStandardBaggagePlacesForPerson: number;
  fwBusinessBaggagePlacesForPerson: number;
  bwExtraBaggagePrice: number;
  bwMaxExtraBaggagePlacesForPerson: number;
  bwBaggageSurchargePrice: number;
  bwStandardBaggagePlacesForPerson: number;
  bwBusinessBaggagePlacesForPerson: number;

  fwPrice: number;
  bwPrice: number;

  bwSeatNumbers: string;
  fwSeatNumbers: string;


  // fwFirst_ticket_num: number;
  // fwSecond_ticket_num: number;
  // fwThird_ticket_num: number;
  // bwFirst_ticket_num: number;
  // bwSecond_ticket_num: number;
  // bwThird_ticket_num: number;


  fwAircompany_name: string;
  fwArrivalAirportCountry: string;
  fwArrivalAirportName: string;
  fwArrivalCity: string;
  fwArrivalDate: Date;
  fwArrivalTime: string;
  fwDepartureAirportCountry: string;
  fwDepartureAirportName: string;
  fwDepartureCity: string;
  fwDepartureDate: Date;
  fwDepartureTime: string;
  fwStandardClassCapacity: number;
  fwBusinessClassCapacity: number;
  // fwFirstClassCapacity:number;
  fwFlightDuration: string;
  fwFlight_id: number;
  fwNumberOfTransfers: number;


  bwAircompany_name: string;
  bwArrivalAirportCountry: string;
  bwArrivalAirportName: string;
  bwArrivalCity: string;
  bwArrivalDate: Date;
  bwArrivalTime: string;
  bwDepartureAirportCountry: string;
  bwDepartureAirportName: string;
  bwDepartureCity: string;
  bwDepartureDate: Date;
  bwDepartureTime: string;
  // bwFirstClassCapacity:number;
  bwStandardClassCapacity: number;
  bwBusinessClassCapacity: number;
  bwFlightDuration: string;
  bwFlight_id: number;
  bwNumberOfTransfers: number;

}

export class ITicketFreePlaces {
  fwFlight_id: number;
  bwFlight_id: number;
  flightClass: string;
}
