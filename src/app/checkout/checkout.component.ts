import { Component, OnInit, ViewChild } from '@angular/core';
import { cart, order, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('orderData') orderDataForm!: NgForm;

  totalPrice: number | undefined;
  discountAvailable = false;
  productData: undefined | product;
  discountTime: Date | undefined;
  discountPercent:number=0;
  cartData: cart[] | undefined;
  paymentSuccess: boolean = false;
  orderMsg: string | undefined;
  selectedPaymentMethod: string = environment.SelectedPaymentMethod;
  shippingData: any={
    cardNumber: '',
    pin: '',
  };
  constructor(private product:ProductService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.discountPercent = this.product.discountPercent;

    this.product.discountAvailable.subscribe((isAvailable) => {
      this.discountAvailable = isAvailable;
    });

    this.product.discountTime.subscribe((endTime) => {
      this.discountTime = endTime;
    });

    this.authService.currentUser.subscribe(currentUser => {
      if (currentUser) {
        // Prefill the form fields with the user's data
        this.shippingData.name = currentUser.name;
        this.shippingData.email = currentUser.email;
        this.shippingData.address = currentUser.address; // Update this property with the user's address property
        this.shippingData.phonenumber = currentUser.phonenumber; // Update this property with the user's phone number property
      }
    });
    // const currentUser = this.authService.currentUserValue;

    // if (currentUser) {
    //   // Prefill the form fields with the user's data
    //   this.shippingData.name = currentUser.name;
    //   this.shippingData.email = currentUser.email;
    //   this.shippingData.address = currentUser.address; // Update this property with the user's address property
    //   this.shippingData.phonenumber = currentUser.phonenumber; // Update this property with the user's phone number property
    // }

    this.product.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      //this.totalPrice = price + (price / 10) + 100 ;
      this.totalPrice=this.product.totalPrice;

      console.warn(this.totalPrice);

    })
  }


  isFormValid() {
    if (this.selectedPaymentMethod === 'cashOnDelivery') {
      // For Cash on Delivery, check if all the other fields are filled
      return this.orderDataForm?.valid;
    } else if (this.selectedPaymentMethod === 'onlinePayment') {
      // For Online Payment, check if all the fields including cardNumber and pin are filled
      return this.orderDataForm?.valid &&
        !!this.shippingData.cardNumber &&
        !!this.shippingData.pin;
    } else {
      // No payment method is selected, disable the "Order Now" button
      return false;
    }
  }
  orderNow(data: { name:string,email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700)
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = environment.OrderMessage;
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000);

        }

      })
    }

  }
  isCardNumberValid(): boolean {
    const cardNumber = this.shippingData.cardNumber?.trim();
    return !!cardNumber && cardNumber.length === 16;
  }

  isPinValid(): boolean {
    const pin = this.shippingData.pin?.trim();
    return !!pin && pin.length === 4;
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
