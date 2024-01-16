import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl= environment.MainBaseUrl;
  jsonUrl=environment.JSONUrl;
  discountAvailable = new EventEmitter<boolean>();
  discountTime = new EventEmitter<Date>();
  //countdownTime: number=0;
  countdownTime: Date = new Date(0);
  totalPrice: number = 0;
  cartData = new EventEmitter<product[] | []>();
  discountPercent = 50; // Set the discount percent here
  private startTime: Date = new Date('2023-06-24 08:00:00'); // Set the start time here
  private endTime: Date = new Date('2023-08-08 21:24:00'); // Set the end time here


  constructor(
    private http: HttpClient // Use @Inject decorator
  ) {
  setInterval(() => {
    this.updateDiscountStatus();
  }, 1000);
}

add(data:product){
  let formData = new FormData();
  formData.append("name",data.name);
  formData.append("price",data.price.toString());
  formData.append("category",data.category);
  formData.append("color",data.color);
  formData.append("authorname",data.authorname);
  formData.append("description",data.description);
  formData.append("imageFile",data.imageFile??"");
  return this.http.post(`${this.baseUrl}/addProduct`,formData);
  //     return this.http.post(`${this.baseUrl}/api/AngularProduct/addProduct`, formData);
}
updateProduct(id:number,product: product) {
  const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('color', product.color);
    formData.append('authorname', product.authorname);
    formData.append('description', product.description);
    formData.append('ImageFile', product.imageFile??"");

  return this.http.put<product>(
    `${this.baseUrl}/editProduct/${id}`,
    formData
  );
}
getAll(){
  return this.http.get<product[]>(`${this.baseUrl}/getall`);
}
allProducts(){
  return this.http.get<product[]>(`${this.baseUrl}/getall`);
}
deleteProduct(id:number){
  return this.http.delete(`${this.baseUrl}/deleteProduct/${id}`)
}
getProduct(id: string) {
  return this.http.get<product>(`${this.baseUrl}/getProductById/${id}`);
}
addProduct(data:product){
  return this.http.post(`${this.jsonUrl}/products`,data);
}
productList(){
  return this.http.get<product[]>(`${this.baseUrl}/getall`);
}
popularProducts() {
  return this.http.get<product[]>(`${this.baseUrl}/getHomePage/HomePage`);
}

homePage() {
  return this.http.get<product[]>(`${this.baseUrl}/getHomePages/image`);
}

homePages() {
  return this.http.get<product[]>(`${this.baseUrl}/getHomePage/HomePage`);
}
getProductsByCategory(category: string): Observable<product[]> {
  const url = `${this.baseUrl}/getByCategory/${category}`;
  return this.http.get<product[]>(url);
}
newArrivals() {
  return this.http.get<product[]>(`${this.baseUrl}/getNewArrivals/NewArrivals`);
}

trendyProducts() {
  return this.http.get<product[]>(`${this.baseUrl}/getProducts/Products`);
}


orderHistory() {
  return this.http.get<order[]>(`${this.jsonUrl}/orders`);
}
localAddToCart(data: product) {
  let cartData = [];
  let localCart = localStorage.getItem('localCart');
  if (!localCart) {
    localStorage.setItem('localCart', JSON.stringify([data]));
    this.cartData.emit([data]);
  } else {
    cartData = JSON.parse(localCart);
    cartData.push(data);
    localStorage.setItem('localCart', JSON.stringify(cartData));
    this.cartData.emit(cartData);
  }
}

removeItemFromCart(productId: number) {
  let cartData = localStorage.getItem('localCart');
  if (cartData) {
    let items: product[] = JSON.parse(cartData);
    items = items.filter((item: product) => productId !== item.id);
    localStorage.setItem('localCart', JSON.stringify(items));
    this.cartData.emit(items);
  }
}
addToCart(cartData: cart) {
  const originalPrice = cartData.price;
  if (this.isDiscountAvailable()) {
    const discountedPrice = this.getDiscountedPrice(cartData.price);
    if (discountedPrice) {
      cartData.price = discountedPrice;
    }
  }
  cartData.originalPrice = originalPrice;

  let localCartData = JSON.parse(localStorage.getItem('localCart') || '[]');
  localCartData.push(cartData);
  localStorage.setItem('localCart', JSON.stringify(localCartData));

  return this.http.post(`${this.jsonUrl}/cart`, cartData).pipe(
    tap((result) => {
      this.cartData.emit(localCartData);
    })
  );
}

getCartList(userId: number) {
  return this.http
    .get<product[]>(`${this.jsonUrl}/cart?userId=` + userId, {
      observe: 'response',
    })
    .subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
}
removeToCart(cartId: number) {
  return this.http.delete(`${this.jsonUrl}/cart/` + cartId);
}
currentCart() {
  let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);
  return this.http.get<cart[]>(`${this.jsonUrl}/cart?userId=` + userData.id);
}

orderNow(data: order) {
  return this.http.post(`${this.jsonUrl}/orders`, data);
}
orderList() {
  let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);
  return this.http.get<order[]>(`${this.jsonUrl}/orders?userId=` + userData.id);
}
deleteCartItems(cartId: number) {
  return this.http.delete(`${this.jsonUrl}/cart/` + cartId).subscribe((result) => {
    this.cartData.emit([]);
  })
}
searchProduct(query: string) {
  return this.http.get<product[]>(
    `${this.baseUrl}/searchProduct/search?query=${query}`
  );
}
cancelOrder(orderId:number){
  return this.http.delete(`${this.jsonUrl}/orders/`+orderId)
}
isDiscountAvailable(): boolean {
  const now = new Date();
  const timeDifference = this.endTime.getTime() - now.getTime();
  this.countdownTime = new Date(Math.max(0, timeDifference));
  return now >= this.startTime && now <= this.endTime;
}
getDiscountedPrice(price: number): number | undefined {
  if (this.isDiscountAvailable()) {
    return price - (price * this.discountPercent) / 100;
  }
  return undefined;
}
private updateDiscountStatus() {
  const now = new Date();
  const isAvailable = now >= this.startTime && now <= this.endTime;
  this.discountAvailable.emit(isAvailable);

  if (isAvailable) {
    this.discountTime.emit(this.endTime);
    this.countdownTime = new Date(this.endTime.getTime() - now.getTime());
  } else {
    this.countdownTime = new Date(0);
  }
}
}









// import { EventEmitter, Injectable } from '@angular/core';
// import { cart, order, product } from '../data-type';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { ConfigService } from './config.service';
// import { environment } from 'src/environments/environment.prod';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   baseUrl = environment.MainBaseUrl; // Update this line
//   // ... (rest of the code)

//   add(data: product) {
//     // Update URL here
//     return this.http.post(`${this.baseUrl}/api/AngularProduct/addProduct`, formData);
//   }

//   updateProduct(id: number, product: product) {
//     // Update URL here
//     return this.http.put<product>(
//       `${this.baseUrl}/api/AngularProduct/editProduct/${id}`,
//       formData
//     );
//   }

//   getAll() {
//     // Update URL here
//     return this.http.get<product[]>(`${this.baseUrl}/api/AngularProduct/getall`);
//   }

//   allProducts() {
//     // Update URL here
//     return this.http.get<product[]>(`${this.baseUrl}/api/AngularProduct/getall`);
//   }

//   // ... (rest of the code)
// }















// import { EventEmitter, Injectable } from '@angular/core';
// import { cart, order, product } from '../data-type';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { ConfigService } from './config.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   baseUrl= 'http://localhost:5285/api/AngularProduct'
//   discountAvailable = new EventEmitter<boolean>();
//   discountTime = new EventEmitter<Date>();
//   //countdownTime: number=0;
//   countdownTime: Date = new Date(0);
//   totalPrice: number = 0;
//   cartData = new EventEmitter<product[] | []>();
//   discountPercent = 50; // Set the discount percent here
//   private startTime: Date = new Date('2023-06-24 08:00:00'); // Set the start time here
//   private endTime: Date = new Date('2023-07-16 19:24:00'); // Set the end time here


//   constructor(
//     private http: HttpClient,private configService: ConfigService // Use @Inject decorator
//   ) {
//     this.configService.loadConfig().then(() => {
//       this.discountPercent = this.configService.getDiscountPercent();
//       this.startTime = this.configService.getStartTime();
//       this.endTime = this.configService.getEndTime();
//     });
//   setInterval(() => {
//     this.updateDiscountStatus();
//   }, 1000);
// }

// add(data:product){
//   let formData = new FormData();
//   formData.append("name",data.name);
//   formData.append("price",data.price.toString());
//   formData.append("category",data.category);
//   formData.append("color",data.color);
//   formData.append("authorname",data.authorname);
//   formData.append("description",data.description);
//   formData.append("imageFile",data.imageFile??"");
//   return this.http.post('http://localhost:5285/api/AngularProduct/Add',formData);
// }

// updateProduct(id:number,product: product) {
//   const formData = new FormData();
//     formData.append('name', product.name);
//     formData.append('price', product.price.toString());
//     formData.append('category', product.category);
//     formData.append('color', product.color);
//     formData.append('authorname', product.authorname);
//     formData.append('description', product.description);
//     formData.append('ImageFile', product.imageFile??"");

//   return this.http.put<product>(
//     `http://localhost:5285/api/AngularProduct/EditProduct/${id}`,
//     formData
//   );
// }

// // updateProduct(product: product) {
// //   return this.http.put<product>(
// //     `http://localhost:5285/api/AngularProduct/EditProduct/${product.id}`,
// //     product
// //   );
// // }
// getAll(){
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/getall');
// }
// allProducts(){
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/getall');
// }

// // allProducts() {
// //   return this.http.get<product[]>('http://localhost:3000/products');
// // }
// deleteProduct(id:number){
//   return this.http.delete(`http://localhost:5285/api/AngularProduct/DeleteProduct/${id}`)
// }

// // getProduct(id: string) {
// //   return this.http.get<product>(`http://localhost:3000/products/${id}`);
// // }
// getProduct(id: string) {
//   return this.http.get<product>(`http://localhost:5285/api/AngularProduct/GetProductById/${id}`);
// }

// // updateProduct(product: product) {
// //   return this.http.put<product>(
// //     `http://localhost:5285/api/AngularProduct/EditProduct/${product.id}`,
// //     product
// //   );
// // }



// addProduct(data:product){
//   return this.http.post('http://localhost:3000/products',data);
// }
// productList(){
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/getall');
// }
// // deleteProduct(id:number){
// //   return this.http.delete(`http://localhost:3000/products/${id}`)
// // }

// // getProduct(id: string) {
// //   return this.http.get<product>(`http://localhost:3000/products/${id}`);
// // }


// // updateProduct(product: product) {
// //   return this.http.put<product>(
// //     `http://localhost:3000/products/${product.id}`,
// //     product
// //   );
// // }

// popularProducts() {
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/GetHomePage/HomePage');
// }

// homePage() {
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/GetHomePages/image');
// }

// homePages() {
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/GetHomePage/HomePage');
// }

// // getProductsByCategory(category: string): Observable<product[]> {
// //   const url = `http://localhost:3000/products?category=${category}`;http://localhost:5285/api/AngularProduct/AddGetByCategory
// //   return this.http.get<product[]>(url);
// // }

// getProductsByCategory(category: string): Observable<product[]> {
//   const url = `http://localhost:5285/api/AngularProduct/GetByCategory/${category}`;
//   return this.http.get<product[]>(url);
// }
// newArrivals() {
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/GetNewArrivals/NewArrivals');
// }

// trendyProducts() {
//   return this.http.get<product[]>('http://localhost:5285/api/AngularProduct/GetProducts/Products');
// }


// orderHistory() {
//   return this.http.get<order[]>('http://localhost:3000/orders');
// }

// // newArrivals() {
// //   return this.http.get<product[]>('http://localhost:3000/products?sort=date&order=desc&_limit=8');
// // }


// // allProducts() {
// //   return this.http.get<product[]>('http://localhost:3000/products');
// // }


// localAddToCart(data: product) {
//   let cartData = [];
//   let localCart = localStorage.getItem('localCart');
//   if (!localCart) {
//     localStorage.setItem('localCart', JSON.stringify([data]));
//     this.cartData.emit([data]);
//   } else {
//     cartData = JSON.parse(localCart);
//     cartData.push(data);
//     localStorage.setItem('localCart', JSON.stringify(cartData));
//     this.cartData.emit(cartData);
//   }
// }

// removeItemFromCart(productId: number) {
//   let cartData = localStorage.getItem('localCart');
//   if (cartData) {
//     let items: product[] = JSON.parse(cartData);
//     items = items.filter((item: product) => productId !== item.id);
//     localStorage.setItem('localCart', JSON.stringify(items));
//     this.cartData.emit(items);
//   }
// }

// // addToCart(cartData: cart) {
// //   return this.http.post('http://localhost:3000/cart', cartData);
// // }
// // addToCart(cartData: cart) {
// //   const originalPrice = cartData.price;
// //   if (this.isDiscountAvailable()) {
// //     const discountedPrice = this.getDiscountedPrice(cartData.price);
// //     if (discountedPrice) {
// //       cartData.price = discountedPrice;
// //     }
// //   }
// //   cartData.originalPrice = originalPrice;
// //   return this.http.post('http://localhost:3000/cart', cartData);
// // }
// addToCart(cartData: cart) {
//   const originalPrice = cartData.price;
//   if (this.isDiscountAvailable()) {
//     const discountedPrice = this.getDiscountedPrice(cartData.price);
//     if (discountedPrice) {
//       cartData.price = discountedPrice;
//     }
//   }
//   cartData.originalPrice = originalPrice;

//   let localCartData = JSON.parse(localStorage.getItem('localCart') || '[]');
//   localCartData.push(cartData);
//   localStorage.setItem('localCart', JSON.stringify(localCartData));

//   return this.http.post('http://localhost:3000/cart', cartData).pipe(
//     tap((result) => {
//       this.cartData.emit(localCartData);
//     })
//   );
// }

// getCartList(userId: number) {
//   return this.http
//     .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
//       observe: 'response',
//     })
//     .subscribe((result) => {
//       if (result && result.body) {
//         this.cartData.emit(result.body);
//       }
//     });
// }
// removeToCart(cartId: number) {
//   return this.http.delete('http://localhost:3000/cart/' + cartId);
// }
// currentCart() {
//   let userStore = localStorage.getItem('user');
//   let userData = userStore && JSON.parse(userStore);
//   return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
// }

// orderNow(data: order) {
//   return this.http.post('http://localhost:3000/orders', data);
// }
// orderList() {
//   let userStore = localStorage.getItem('user');
//   let userData = userStore && JSON.parse(userStore);
//   return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
// }

// deleteCartItems(cartId: number) {
//   return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
//     this.cartData.emit([]);
//   })
// }

// // searchProduct(query: string) {
// //   return this.http.get<product[]>(
// //     `http://localhost:3000/products?q=${query}`
// //   );
// // }

// // searchProduct(query: string) {
// //   return this.http.get<product[]>(
// //     `http://localhost:5285/api/AngularProduct/search?query=${query}`
// //   );
// // }

// searchProduct(query: string) {
//   return this.http.get<product[]>(
//     `http://localhost:5285/api/AngularProduct/SearchProduct/search?query=${query}`
//   );
// }


// cancelOrder(orderId:number){
//   return this.http.delete('http://localhost:3000/orders/'+orderId)

// }

// // isDiscountAvailable(): boolean {
// //   const now = new Date();
// //   return now >= this.startTime && now <= this.endTime;
// // }

// // isDiscountAvailable(): boolean {
// //   const now = new Date();
// //   const timeDifference = this.endTime.getTime() - now.getTime();
// //   this.countdownTime = Math.max(0, timeDifference);
// //   return now >= this.startTime && now <= this.endTime;
// // }
// isDiscountAvailable(): boolean {
//   const now = new Date();
//   const timeDifference = this.endTime.getTime() - now.getTime();
//   this.countdownTime = new Date(Math.max(0, timeDifference));
//   return now >= this.startTime && now <= this.endTime;
// }



// getDiscountedPrice(price: number): number | undefined {
//   if (this.isDiscountAvailable()) {
//     return price - (price * this.discountPercent) / 100;
//   }
//   return undefined;
// }
// // private updateDiscountStatus() {
// //   const now = new Date();
// //   const isAvailable = now >= this.startTime && now <= this.endTime;
// //   this.discountAvailable.emit(isAvailable);

// //   if (isAvailable) {
// //     this.discountTime.emit(this.endTime);
// //   }
// // }
// private updateDiscountStatus() {
//   const now = new Date();
//   const isAvailable = now >= this.startTime && now <= this.endTime;
//   this.discountAvailable.emit(isAvailable);

//   if (isAvailable) {
//     this.discountTime.emit(this.endTime);
//     this.countdownTime = new Date(this.endTime.getTime() - now.getTime());
//   } else {
//     this.countdownTime = new Date(0);
//   }
// }




// }
