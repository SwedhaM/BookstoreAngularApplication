// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { toHtml } from '@fortawesome/fontawesome-svg-core';
// import { product } from '../data-type';
// import { BookService } from '../services/book.service';
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
// menuType:string='default'
// isMyOrdersPage: boolean = false;
// sellerName:string="";
// userName:string="";
// searchResult:undefined|product[];
// cartItems=0;
// categories: string[] = [];
// selectedCategory: string = '';
//   constructor(private route:Router, private product:ProductService,private bookService:BookService) { }

//   ngOnInit():void {

//     this.route.events.subscribe((val:any)=>{
//       if(val.url){

//         const currentRoute = val.urlAfterRedirects;
//         this.isMyOrdersPage = currentRoute.includes('my-orders');

//         if(localStorage.getItem('seller')){
//           //if(localStorage.getItem('seller') && val.url.includes('seller')){
//             let sellerStore=localStorage.getItem('seller');
//             let sellerData = sellerStore && JSON.parse(sellerStore);
//             this.sellerName=sellerData.name;
//             this.menuType="seller";
//           }
//           else if(localStorage.getItem('user')){
//             let userStore = localStorage.getItem('user');
//             let userData = userStore && JSON.parse(userStore);
//             this.userName= userData.name;
//             this.menuType='user';
//             this.product.getCartList(userData.id);
//           }
//           else{
//             this.menuType="default";
//           }
//       }
//     });
//     let cartData=localStorage.getItem('localCart');
//     if(cartData){
//       this.cartItems=JSON.parse(cartData).length

//     }
//     this.product.cartData.subscribe((items)=>{
//       this.cartItems=items.length
//     })


//     // this.product.productList().subscribe((products: product[]) => {
//     //   this.categories = [...new Set(products.map(product => product.category))];
//     //   this.selectedCategory = this.categories[0]; // Set the selectedCategory to the first category
//     // });
//     // this.bookService.fetchCategories();

//     // this.bookService.selectedCategory$.subscribe(category => {
//     //   this.selectedCategory = category;
//     // });
//     this.bookService.categories$.subscribe((categories) => {
//       this.categories = categories;
//       this.selectedCategory = categories[0]; // Set the selectedCategory to the first category
//     });
//     this.bookService.fetchCategories();
//   }
//   logout(){
//     localStorage.removeItem('seller');
//     this.route.navigate(['/auth'])
//   }
//   userLogout(){
//     localStorage.removeItem('user');
//     this.route.navigate(['/auth'])
//     this.product.cartData.emit([])
//   }
// searchProduct(query:KeyboardEvent){
//   if(query){
//     const element = query.target as HTMLInputElement;
//     this.product.searchProduct(element.value).subscribe((result)=>{

//       if(result.length>5){
//         result.length=length
//       }
//       this.searchResult=result;
//     })
//   }
// }

// onCategorySelect(event: any) {
//   const category = event.target.value;
//   this.bookService.filterByCategory(category);
//   this.bookService.fetchCategories();
//   this.route.navigate(['/filtered-page']); // Replace '/filtered-page' with your actual filtered page route
// }


// redirectToDetails(id:number){
//   this.route.navigate(['/details/'+id])
// }
// hideSearch(){
//   this.searchResult=undefined
// }
// submitSearch(val:string){
//   console.warn(val)
// this.route.navigate([`search/${val}`]);
// }

// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { toHtml } from '@fortawesome/fontawesome-svg-core';
import { product } from '../data-type';
import { BookService } from '../services/book.service';
import { LoggerService } from '../logger/logger.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = environment.MenuType;
  isMyOrdersPage: boolean = false;
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItems = 0;
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private route: Router,
    private product: ProductService,
    private bookService: BookService,
    private logger:LoggerService
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        const currentRoute = val.urlAfterRedirects;
        this.isMyOrdersPage = currentRoute.includes('my-orders');

        if (localStorage.getItem('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });

    this.bookService.categories$.subscribe((categories) => {
      this.categories = categories;
      this.selectedCategory = categories[0]; // Set the selectedCategory to the first category
    });
    this.bookService.fetchCategories();
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/auth']);
    this.logger.log('LoggedOut successfully.');
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }

  onCategorySelect(event: any) {
    const category = event.target.value;
    this.bookService.filterByCategory(category);
    this.route.navigate(['/filtered-page']); // Replace '/filtered-page' with your actual filtered page route
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
