export class FlightVM {

  firstTransferDuration: string;
  firstTransferCity: string;
  maxBaggageWeight: number;
  seatNumbers: string;
  timeZone: string;
  totalExtraBaggageWeight: number;
  numberOfBaggagePlaces: number;
  standardBaggageWeight: number;
  businessBaggageWeight: number;
  standardhandLuggageWeight: number;
  businesshandLuggageWeight: number;
  extraBaggagePrice: number;
  maxExtraBaggagePlacesForPerson: number;
  baggageSurchargePrice: number;
  standardBaggagePlacesForPerson: number;
  businessBaggagePlacesForPerson: number;
  price: number;
  standardSeatsInRow: number;
  businessSeatsInRow: number;

  standardUSB: string;
  standardWiFi: string;
  standardEntertainment: string;
  standardDrink: string;
  standardFood: string;
  businessUSB: string;
  businessWiFi: string;
  businessEntertainment: string;
  businessDrink: string;
  businessFood: string;
  // seatNumbers: string;

  aircompany_name: string;
  planeName: string;
  planeId: number;
  arrivalAirportCountry: string;
  arrivalAirportName: string;
  arrivalCity: string;
  arrivalDate: Date;
  arrivalTime: string;
  departureAirportCountry: string;
  departureAirportName: string;
  departureCity: string;
  departureDate: Date;
  departureTime: string;
  standardClassCapacity: number;
  businessClassCapacity: number;
  flightDuration: string;
  flightDurationInHours: number;
  flight_id: number;
  numberOfTransfers: number;
}
