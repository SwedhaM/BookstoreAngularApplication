import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order, product } from '../data-type';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData:order[]|undefined;
  orderMsg: string | undefined;
  discountAvailable = false;
  productData: undefined | product;
  discountTime: Date | undefined;
  discountPercent:number=0;
  constructor(private product:ProductService) { }

  ngOnInit():void{
    this.discountPercent = this.product.discountPercent;

    this.product.discountAvailable.subscribe((isAvailable) => {
      this.discountAvailable = isAvailable;
    });

    this.product.discountTime.subscribe((endTime) => {
      this.discountTime = endTime;
    });
    this.getOrderList()
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.orderMsg = environment.OrderMessage;
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

  isDiscountAvailable(): boolean {
    return this.product.isDiscountAvailable();
  }
  getDiscountedPrice(): number | undefined {
    if (this.isDiscountAvailable()) {
      return this.product.getDiscountedPrice(this.productData!.price);
    }
    return undefined;
  }

  // get remainingTime(): number {
  //   return this.product.countdownTime;
  // }
  get remainingTime(): number {
    return this.product.countdownTime.getTime();
  }

}
