import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order, product } from '../data-type';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: order[] | undefined;

  constructor(private product:ProductService) { }

  ngOnInit() {
    this.list();
  }

  list(){
    this.product.orderHistory().subscribe((result)=>{
      if(result){
        this.orderHistory=result;
      }
    })
  }

}
