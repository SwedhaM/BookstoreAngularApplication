import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined|product[];
  trendyProducts:undefined|product[];
  newArrivals:undefined|product[];
  imageBaseUrl=environment.ImageBaseUrl;
  imageBase=environment.ImageBaseUrl;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  isSeller: string = environment.isSeller;
  productData: undefined | product;
  discountAvailable = false;
  discountTime: Date | undefined;
  discountPercent:number=0;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    autoplay:true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };

  custom: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    autoplay:true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };


  constructor(private product:ProductService){ }

  ngOnInit(): void {

    const sellerStore = localStorage.getItem('seller');
    const userStore = localStorage.getItem('user');

    if (sellerStore) {
      this.isSeller = 'seller';
    } else if (userStore) {
      this.isSeller = 'user';
      const userData = JSON.parse(userStore);
      this.product.getCartList(userData.id);
    }

    this.discountPercent = this.product.discountPercent;

    this.product.discountAvailable.subscribe((isAvailable) => {
      this.discountAvailable = isAvailable;
    });

    this.product.discountTime.subscribe((endTime) => {
      this.discountTime = endTime;
    });

    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })

    this.product.newArrivals().subscribe((data)=>{
      this.newArrivals=data;
    })
  }


  isDiscountAvailable(product: product): boolean {
    return this.product.isDiscountAvailable();
  }

  getDiscountedPrice(product: product): number | undefined {
    return this.product.getDiscountedPrice(product.price);
  }

  get remainingTime(): number {
    return this.product.countdownTime.getTime();
  }



  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = (user && JSON.parse(user).id) as number;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId:number){
        if(!localStorage.getItem('user')){
        this.product.removeItemFromCart(productId)
        }
        else{
          console.warn("cartData", this.cartData);

          this.cartData && this.product.removeToCart(this.cartData.id)
          .subscribe((result)=>{
            let user = localStorage.getItem('user');
            let userId= user && JSON.parse(user).id;
            this.product.getCartList(userId)
          })
        }
        this.removeCart=false
      }
}




