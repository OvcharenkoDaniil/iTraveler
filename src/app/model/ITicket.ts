export interface ITicket {
  ticketElem_id: number;
  flightClass:string;
  numberOfPassengers: number;
  totalPrice: number;
  fwPrice: number;
  bwPrice: number;
  order_id: number;


   fwFirst_ticket_num:number;
 fwSecond_ticket_num:number;
 fwThird_ticket_num:number;
 bwFirst_ticket_num:number;
 bwSecond_ticket_num:number;
 bwThird_ticket_num:number;



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
