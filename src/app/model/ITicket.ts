export interface ITicket {
  TotalPrice: number;
  FwAircompany_name: string;
  FwDepartureCity: string;
  FwDepartureAirportName: string;
  FwArrivalAirportName: string;
  FwDepartureAirportCountry: string;
  FwArrivalAirportCountry: string;
  FwArrivalCity: string;
  FwDepartureDate: Date;
  FwArrivalDate: Date;
  FwDepartureTime: string;
  FwArrivalTime: string;
  FwFlightDuration: string;
  FwNumberOfTransfers: number;

  BwAircompany_name: string;
  BwDepartureCity: string;
  BwDepartureAirportName: string;
  BwArrivalAirportName: string;
  BwDepartureAirportCountry: string;
  BwArrivalAirportCountry: string;
  BwArrivalCity: string;
  BwDepartureDate: Date;
  BwArrivalDate: Date;
  BwDepartureTime: string;
  BwArrivalTime: string;
  BwFlightDuration: string;
  BwNumberOfTransfers: number;
}
