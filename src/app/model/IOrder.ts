export class OrderVM {
  userEmail: string;
  numberOfTickets: number;
  ticket_id: number;
  FlightClass:string;
}
export class OrderData {
  orderId:number;
}
export class Order {
 order_id:number;
 user_id:number;
 numberOfTickets:number;
 ticket_id:number;
 flightClass:string;
 creationDate:Date;
 expirationDate:Date;
}
