import {Component, OnInit} from '@angular/core';
import {ACCESS_TOKEN_KEY, AuthService} from "../services/auth.service";
import {OrderService} from "../services/order.service";
import {Order} from "../model/IOrder";
import {AlertifyService} from "../services/alertify.service";
import {IUser} from "../model/user";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    //this.authService.clearAllData()
    console.log("ngOnInit")

    this.orderService.GetAllOrders().subscribe(
      orderList => {
        let today = new Date();
        console.log("orderList")
        console.log("today")
        console.log(today)
        for (const order of orderList) {
          console.log("order")
          console.log(order.expirationDate)
          if (new Date(order.expirationDate) < today) {
            this.orderService.DeleteOrder(order.order_id)
              .subscribe(
                response => {
                  var user:IUser = this.authService.getUserData();
                  this.orderService.getOrders(user).subscribe(
                    response => {
                    }, error => {
                    }
                  );
                }, error => {
                }
              );
          }
        }
      }, error => {
      }
    );


  }

}
