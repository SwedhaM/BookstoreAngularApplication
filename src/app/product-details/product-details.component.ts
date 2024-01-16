import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { faL, faLineChart } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  isSeller: string = environment.isSeller;
  cartData: product | undefined;
  discountAvailable = false;
  discountTime: Date | undefined;
  discountPercent:number=0;
  imageBaseUrl=environment.ImageBaseUrl;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}

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

    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: product) => productId === item.id.toString());
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = (user && JSON.parse(user).id) as number;
          this.product.getCartList(userId);

          this.product.cartData.subscribe((result) => {
            let item = result.filter((item: product) => productId?.toString() === item.productId?.toString());
            if (item.length) {
              this.removeCart = true;
            }
          });
        }
      });
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
            const localCartData = JSON.parse(localStorage.getItem('localCart') || '[]');
  localCartData.push(this.productData);
  localStorage.setItem('localCart', JSON.stringify(localCartData));
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId:number){
        if(!localStorage.getItem('user')){
        this.product.removeItemFromCart(productId)
        const localCartData = JSON.parse(localStorage.getItem('localCart') || '[]');
    const updatedCartData = localCartData.filter((item: product) => item.id !== productId);
    localStorage.setItem('localCart', JSON.stringify(updatedCartData));
        }
        else{
          console.warn("cartData", this.cartData);

          this.cartData && this.product.removeToCart(this.cartData.id)
          .subscribe((result)=>{
            let user = localStorage.getItem('user');
            let userId= user && JSON.parse(user).id;
            this.product.getCartList(userId)
          })
          if (this.cartData) {
            const localCartData = JSON.parse(localStorage.getItem('localCart') || '[]');
            const updatedCartData = localCartData.filter((item: product) => item.id !== this.cartData!.id);
            localStorage.setItem('localCart', JSON.stringify(updatedCartData));
          }
        }
        this.removeCart=false
      }
}









// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { cart, product } from '../data-type';
// import { faL, faLineChart } from '@fortawesome/free-solid-svg-icons';

// @Component({
//   selector: 'app-product-details',
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css']
// })
// export class ProductDetailsComponent implements OnInit {
//   productData:undefined | product;
//   productQuantity:number=1;
//   removeCart=false;
//   cartData:product|undefined;

//   constructor(private activeRoute:ActivatedRoute, private product:ProductService) { }

//   ngOnInit():void{
//     let productId= this.activeRoute.snapshot.paramMap.get('productId');
//     console.warn(productId);
//     productId && this.product.getProduct(productId).subscribe((result)=>{
//       this.productData= result;
//       let cartData=localStorage.getItem('localCart');
//       if(productId && cartData){
//         let items = JSON.parse(cartData);
//         items = items.filter((item:product)=>productId=== item.id.toString());
//         if(items.length){
//           this.removeCart=true
//         }
//         else{
//           this.removeCart=false
//         }

//       }
//       let user = localStorage.getItem('user');
//       if(user){
//         let userId= user && JSON.parse(user).id;
//         this.product.getCartList(userId);

//         this.product.cartData.subscribe((result)=>{
//           let item=result.filter((item:product)=>productId?.toString()===item.productId?.toString())
//           if(item.length){
//             this.removeCart=true
//           }
//         })
//       }

//     });
//   }

//   handleQuantity(val:string){
//     if(this.productQuantity<20 && val==='plus'){
//       this.productQuantity+=1;
//     }
//     else if(this.productQuantity>1 && val==='min'){
//       this.productQuantity-=1;
//     }
//   }

//   addToCart(){
//     if(this.productData){
//       this.productData.quantity = this.productQuantity;
//       if(!localStorage.getItem('user')){
//         this.product.localAddToCart(this.productData);
//         this.removeCart=true
//       }else{
//         let user = localStorage.getItem('user');
//         let userId= user && JSON.parse(user).id;
//         let cartData:cart={
//           ...this.productData,
//           productId:this.productData.id,
//           userId
//         }
//         delete cartData.id;
//         this.product.addToCart(cartData).subscribe((result)=>{
//           if(result){
//            this.product.getCartList(userId);
//            this.removeCart=true
//           }
//         })
//       }

//     }
//   }
//   removeToCart(productId:number){
//     if(!localStorage.getItem('user')){
//     this.product.removeItemFromCart(productId)
//     }
//     else{
//       console.warn("cartData", this.cartData);

//       this.cartData && this.product.removeToCart(this.cartData.id)
//       .subscribe((result)=>{
//         let user = localStorage.getItem('user');
//         let userId= user && JSON.parse(user).id;
//         this.product.getCartList(userId)
//       })
//     }
//     this.removeCart=false
//   }

//   }
