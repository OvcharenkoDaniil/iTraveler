export interface ITicket {
  ticketElem_id: number;
  numberOfPassengers: number;
  totalPrice: number;
  fwPrice: number;
  bwPrice: number;
  order_id: number;

  fwAircompany_name:string;
  fwArrivalAirportCountry: string;
  fwArrivalAirportName:string;
  fwArrivalCity:string;
  fwArrivalDate:Date;
  fwArrivalTime:string;
  fwDepartureAirportCountry:string;
  fwDepartureAirportName:string;
  fwDepartureCity:string;
  fwDepartureDate:Date;
  fwDepartureTime:string;
  fwFirstClassCapacity:number;
  fwFlightDuration:string;
  fwFlight_id:number;
  fwNumberOfTransfers:number;
  fwStandardClassCapacity:number;

  bwAircompany_name:string;
  bwArrivalAirportCountry: string;
  bwArrivalAirportName:string;
  bwArrivalCity:string;
  bwArrivalDate:Date;
  bwArrivalTime:string;
  bwDepartureAirportCountry:string;
  bwDepartureAirportName:string;
  bwDepartureCity:string;
  bwDepartureDate:Date;
  bwDepartureTime:string;
  bwFirstClassCapacity:number;
  bwFlightDuration:string;
  bwFlight_id:number;
  bwNumberOfTransfers:number;
  bwStandardClassCapacity:number;
}
