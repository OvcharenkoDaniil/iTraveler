export class OrderDetailVM {
  fwFlight_id: number;
  bwFlight_id: number;
  fwNumberOfBaggagePlaces: number;
  bwNumberOfBaggagePlaces: number;
  fwPrice: number;
  bwPrice: number;
  numberOfTickets: number;
  fwSeatNumbers: string;
  bwSeatNumbers: string;
  flightClass: string;
  IsOneSide: boolean;
  fwTotalExtraBaggageWeight: number;
  bwTotalExtraBaggageWeight: number;
  email: string;
}

export class OrderVM {
  NumberOfBaggagePlaces: number;
  Price: number;
  Order_id: number;
  Direction: string;
  SeatNumbers: string;
  FlightClass: string;
}

export class OrderData {
  orderId: number;
}

export class Order {
  order_id: number;
  user_id: number;
  numberOfTickets: number;
  ticket_id: number;
  flightClass: string;
  creationDate: Date;
  expirationDate: Date;
}
