
// import { Component, OnInit } from '@angular/core';
// import { cart, priceSummary, product } from '../data-type';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html',
//   styleUrls: ['./cart-page.component.css']
// })
// export class CartPageComponent implements OnInit {
//   cartData: cart[] | undefined;
//   priceSummary: priceSummary = {
//     price: 0,
//     discountedPrice: 0,
//     tax: 0,
//     delivery: 0,
//     total: 0,
//     originalPrice: 0
//   };

//   constructor(private product: ProductService, private router: Router) { }

//   ngOnInit(): void {
//     this.loadDetails();
//   }

//   removeToCart(cartId: number | undefined) {
//     cartId && this.cartData && this.product.removeToCart(cartId)
//       .subscribe((result) => {
//         this.loadDetails();
//       });
//   }

//   isDiscountAvailable(): boolean {
//     return this.product.isDiscountAvailable();
//   }

//   increaseQuantity(cart: cart) {
//     if (cart.quantity) {
//       cart.quantity++;
//       cart.price = cart.quantity * cart.price; // Update the price based on the new quantity
//       this.updateCartItem(cart);
//     }
//   }

//   decreaseQuantity(cart: cart) {
//     if (cart.quantity && cart.quantity > 1) {
//       cart.quantity--;
//       cart.price = cart.quantity * cart.price; // Update the price based on the new quantity
//       this.updateCartItem(cart);
//     }
//   }

//   updateCartItem(cart: cart) {
//     const productToUpdate: product = {
//       id: cart.id || 0,
//       name: cart.name,
//       price: cart.price,
//       quantity: cart.quantity,
//       image: cart.image,
//       authorname: '',
//       description: '',
//       category: '',
//       color: '',
//       productId: undefined
//     };

//     this.product.updateProduct(productToUpdate.id,productToUpdate).subscribe((result) => {
//       this.loadDetails();
//       this.updateLocalStorageCart();
//     });
//   }

//   loadDetails() {
//     this.product.currentCart().subscribe((result) => {
//       this.cartData = result;
//       console.warn(this.cartData);
//       let price = 0;
//       result.forEach((item) => {
//         if (item.quantity) {
//           price = price + (+item.price * +item.quantity);
//         }
//       });
//       this.priceSummary.price = price;

//       //this.priceSummary.discountedPrice = this.product.getDiscountedPrice(price);
//       this.priceSummary.originalPrice = price;

//       this.priceSummary.tax = price / 10;
//       this.priceSummary.delivery = 100;
//       this.priceSummary.total = this.priceSummary.originalPrice + (price / 10) + 100 ;

//       if (!this.cartData.length) {
//         this.router.navigate(['/']);
//       }
//     });
//   }

//   checkout() {
//     this.router.navigate(['/checkout']);
//   }

//   private updateLocalStorageCart() {
//     localStorage.setItem('localCart', JSON.stringify(this.cartData));
//   }
// }

  // loadDetails() {
  //   this.product.currentCart().subscribe((result) => {
  //     this.cartData = result;
  //     console.warn(this.cartData);
  //     let price = 0;
  //     result.forEach((item) => {
  //       if (item.quantity && item.originalPrice) {
  //         price = price + (+item.price * +item.quantity);
  //       }
  //     });
  //     this.priceSummary.price = price;

  //     if (this.product.isDiscountAvailable()) {
  //       const discountedPrice = this.product.getDiscountedPrice(price);
  //       if (discountedPrice) {
  //         this.priceSummary.discountedPrice = discountedPrice;
  //         this.priceSummary.originalPrice = price;
  //         this.priceSummary.total = discountedPrice + (price / 10) + 100;
  //       }
  //     } else {
  //       this.priceSummary.originalPrice = price;
  //       this.priceSummary.total = price + (price / 10) + 100;
  //     }

  //     this.priceSummary.tax = price / 10;
  //     this.priceSummary.delivery = 100;
  //     if (!this.cartData.length) {
  //       this.router.navigate(['/']);
  //     }
  //   });


  // }

  // loadDetails() {
  //   this.product.currentCart().subscribe((result) => {
  //     this.cartData = result;
  //     console.warn(this.cartData);
  //     let price = 0;
  //     result.forEach((item) => {
  //       if (item.quantity && item.originalPrice) {
  //         price = price + (+item.price * +item.quantity);
  //       }
  //     });
  //     this.priceSummary.price = price;

  //     //this.priceSummary.discountedPrice = this.product.getDiscountedPrice(price);
  //     this.priceSummary.originalPrice = price;

  //     this.priceSummary.tax = price / 10;
  //     this.priceSummary.delivery = 100;
  //     this.priceSummary.total = this.priceSummary.originalPrice + (price / 10) + 100 ;

  //     if (!this.cartData.length) {
  //       this.router.navigate(['/']);
  //     }
  //   });
  // }




// import { Component, OnInit } from '@angular/core';
// import { cart, priceSummary, product } from '../data-type';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html',
//   styleUrls: ['./cart-page.component.css']
// })
// export class CartPageComponent implements OnInit {
//   cartData: cart[] | undefined;
//   priceSummary: priceSummary = {
//     price: 0,
//     discountedPrice: 0,
//     tax: 0,
//     delivery: 0,
//     total: 0,
//     originalPrice: 0
//   };

//   constructor(private product: ProductService, private router: Router) { }

//   ngOnInit(): void {
//     this.loadDetails();
//   }

//   removeToCart(cartId: number | undefined) {
//     cartId && this.cartData && this.product.removeToCart(cartId)
//       .subscribe((result) => {
//         this.loadDetails();
//       });
//   }

//   isDiscountAvailable(): boolean {
//     return this.product.isDiscountAvailable();
//   }

//   increaseQuantity(cart: cart) {
//     if (cart.quantity) {
//       const previousPrice = cart.price;
//       cart.quantity++;
//       if (cart.originalPrice) {
//         if (this.product.isDiscountAvailable()) {
//           const discountedPrice = this.product.getDiscountedPrice(cart.originalPrice);
//           if (discountedPrice) {
//             cart.price = cart.quantity * discountedPrice;
//             this.priceSummary.discountedPrice=cart.price;
//             this.priceSummary.originalPrice += discountedPrice;
//             this.priceSummary.price += discountedPrice; // Update the price in the summary
//             this.priceSummary.total += discountedPrice ; // Update the total price in the summary
//           }
//         } else {
//           cart.price = cart.quantity * cart.originalPrice;
//           this.priceSummary.originalPrice += cart.originalPrice; // Update the originalPrice in the summary
//           this.priceSummary.price += cart.originalPrice; // Update the price in the summary
//           this.priceSummary.total += cart.originalPrice; // Update the total price in the summary
//           // cart.price = cart.quantity * cart.originalPrice;
//           // this.priceSummary.price += cart.originalPrice; // Update the price in the summary
//           // this.priceSummary.total += cart.originalPrice - previousPrice; // Update the total price in the summary
//         }
//       }
//       this.updateCartItem(cart);
//     }
//   }

//   decreaseQuantity(cart: cart) {
//     if (cart.quantity && cart.quantity > 1) {
//       const previousPrice = cart.price;
//       cart.quantity--;
//       if (cart.originalPrice) {
//         if (this.product.isDiscountAvailable()) {
//           const discountedPrice = this.product.getDiscountedPrice(cart.originalPrice);
//           if (discountedPrice) {
//             cart.price = cart.quantity * discountedPrice;
//             this.priceSummary.discountedPrice=cart.price;
//             this.priceSummary.originalPrice -= discountedPrice;
//             this.priceSummary.price -= discountedPrice; // Update the price in the summary
//             this.priceSummary.total -= discountedPrice ;
//             // cart.price = cart.quantity * discountedPrice;
//             // this.priceSummary.price -= discountedPrice; // Update the price in the summary
//             // this.priceSummary.total -= previousPrice - discountedPrice; // Update the total price in the summary
//           }
//         } else {
//            cart.price = cart.quantity * cart.originalPrice;
//            this.priceSummary.originalPrice -= cart.originalPrice; // Update the originalPrice in the summary
//            this.priceSummary.price -= cart.originalPrice; // Update the price in the summary
//            this.priceSummary.total -= cart.originalPrice; // Update the total price in the summary
//         }
//       }
//       this.updateCartItem(cart);
//     }
//   }

//   updateCartItem(cart: cart) {
//     const productToUpdate: product = {
//       id: cart.id || 0,
//       name: cart.name,
//       price: cart.price,
//       quantity: cart.quantity,
//       image: cart.image,
//       authorname: '',
//       description: '',
//       category: '',
//       color: '',
//       productId: undefined
//     };

//     this.product.updateProduct(productToUpdate.id, productToUpdate).subscribe((result) => {
//       this.loadDetails();
//       this.updateLocalStorageCart();
//     });
//   }

//   loadDetails() {
//     this.product.currentCart().subscribe((result) => {
//       this.cartData = result;
//       console.warn(this.cartData);
//       let price = 0;
//       result.forEach((item) => {
//         if (item.quantity && item.originalPrice) {
//           price = price + (+item.originalPrice * +item.quantity);
//         }
//       });
//       this.priceSummary.price = price;

//       if (this.product.isDiscountAvailable()) {
//         const discountedPrice = this.product.getDiscountedPrice(price);
//         if (discountedPrice) {
//           this.priceSummary.discountedPrice = discountedPrice;
//           this.priceSummary.originalPrice = price;
//           this.priceSummary.total = discountedPrice + (price / 10) + 100;
//         }
//       } else {
//         this.priceSummary.originalPrice = price;
//         this.priceSummary.total = price + (price / 10) + 100;
//       }

//       this.priceSummary.tax = price / 10;
//       this.priceSummary.delivery = 100;

//       if (!this.cartData.length) {
//         this.router.navigate(['/']);
//       }
//     });
//   }

//   checkout() {
//     this.router.navigate(['/checkout']);
//   }

//   private updateLocalStorageCart() {
//     localStorage.setItem('localCart', JSON.stringify(this.cartData));
//   }
// }




import { Component, OnInit } from '@angular/core';
import { cart, priceSummary, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  discountAvailable = false;
  productData: undefined | product;
  discountTime: Date | undefined;
  discountPercent:number=0;
  priceSummary: priceSummary = {
    price: 0,
    discountedPrice: 0,
    tax: 0,
    delivery: 0,
    total: 0,
    originalPrice: 0
  };
imageBaseUrl=environment.ImageBaseUrl;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails();
    this.discountPercent = this.product.discountPercent;

    this.product.discountAvailable.subscribe((isAvailable) => {
      this.discountAvailable = isAvailable;
    });

    this.product.discountTime.subscribe((endTime) => {
      this.discountTime = endTime;
    });
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.cartData && this.product.removeToCart(cartId)
      .subscribe((result) => {
        this.loadDetails();
      });
  }

  isDiscountAvailable(): boolean {
    return this.product.isDiscountAvailable();
  }


  increaseQuantity(cart: cart) {
    if (cart.quantity) {
      const previousPrice = cart.price;
      cart.quantity++;
      if (cart.originalPrice) {
        if (this.product.isDiscountAvailable()) {
          const discountedPrice = this.product.getDiscountedPrice(cart.originalPrice);
          if (discountedPrice) {
            cart.price = cart.quantity * discountedPrice;
            this.priceSummary.discountedPrice!+=discountedPrice;
            this.priceSummary.originalPrice += discountedPrice;
            this.priceSummary.price += discountedPrice; // Update the price in the summary
            this.priceSummary.total += discountedPrice ; // Update the total price in the summary
          }
        } else {
          cart.price = cart.quantity * cart.originalPrice;
          this.priceSummary.originalPrice += cart.originalPrice; // Update the originalPrice in the summary
          this.priceSummary.price += cart.originalPrice; // Update the price in the summary
          this.priceSummary.total += cart.originalPrice; // Update the total price in the summary
          // cart.price = cart.quantity * cart.originalPrice;
          // this.priceSummary.price += cart.originalPrice; // Update the price in the summary
          // this.priceSummary.total += cart.originalPrice - previousPrice; // Update the total price in the summary
        }
      }
      this.updateCartItem(cart);
    }
  }

  decreaseQuantity(cart: cart) {
    if (cart.quantity && cart.quantity > 1) {
      const previousPrice = cart.price;
      cart.quantity--;
      if (cart.originalPrice) {
        if (this.product.isDiscountAvailable()) {
          const discountedPrice = this.product.getDiscountedPrice(cart.originalPrice);
          if (discountedPrice) {
            cart.price = cart.quantity * discountedPrice;
            this.priceSummary.discountedPrice!-=discountedPrice;
            this.priceSummary.originalPrice -= discountedPrice;
            this.priceSummary.price -= discountedPrice; // Update the price in the summary
            this.priceSummary.total -= discountedPrice ;
            // cart.price = cart.quantity * discountedPrice;
            // this.priceSummary.price -= discountedPrice; // Update the price in the summary
            // this.priceSummary.total -= previousPrice - discountedPrice; // Update the total price in the summary
          }
        } else {
           cart.price = cart.quantity * cart.originalPrice;
           this.priceSummary.originalPrice -= cart.originalPrice; // Update the originalPrice in the summary
           this.priceSummary.price -= cart.originalPrice; // Update the price in the summary
           this.priceSummary.total -= cart.originalPrice; // Update the total price in the summary
        }
      }
      this.updateCartItem(cart);
    }
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

  updateCartItem(cart: cart) {
    // Ensure that the required properties are defined before updating
    if (cart.id && cart.name && cart.price && cart.quantity && cart.image) {
      const productToUpdate: product = {
        id: cart.productId || 0, // Use cart.productId if available, otherwise default to 0
        name: cart.name,
        price: cart.price,
        quantity: cart.quantity,
        image: cart.image,
        authorname: '', // Set the appropriate authorname value
        description: '', // Set the appropriate description value
        category: '', // Set the appropriate category value
        color: '', // Set the appropriate color value
        productId: undefined // You can leave this as undefined if it's not being used
      };

      this.product.updateProduct(productToUpdate.id, productToUpdate).subscribe((result) => {
        this.loadDetails();
        this.updateLocalStorageCart();
      });
    }
  }


  // updateCartItem(cart: cart) {
  //   const productToUpdate: product = {
  //     id: cart.id || 0,
  //     name: cart.name,
  //     price: cart.price,
  //     quantity: cart.quantity,
  //     image: cart.image,
  //     authorname: '',
  //     description: '',
  //     category: '',
  //     color: '',
  //     productId: undefined
  //   };

  //   this.product.updateProduct(productToUpdate.id, productToUpdate).subscribe((result) => {
  //     this.loadDetails();
  //     this.updateLocalStorageCart();
  //   });
  // }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;

      result.forEach((item) => {
        if (item.quantity && item.originalPrice) {
          price = price + (+item.originalPrice * +item.quantity);
        }

      });
      this.priceSummary.price = price;

      if (this.product.isDiscountAvailable()) {
        const discountedPrice = this.product.getDiscountedPrice(price);
        if (discountedPrice) {
          this.priceSummary.discountedPrice = discountedPrice;
          this.priceSummary.originalPrice = price;
          this.priceSummary.total = discountedPrice + (price / 10) + 100;
        }
      } else {
        this.priceSummary.originalPrice = price;
        this.priceSummary.total = price + (price / 10) + 100;
      }

      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
      this.product.totalPrice=this.priceSummary.total;
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  private updateLocalStorageCart() {
    localStorage.setItem('localCart', JSON.stringify(this.cartData));
  }
}
