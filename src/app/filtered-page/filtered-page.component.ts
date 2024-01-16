// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../services/book.service';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-filtered-page',
//   templateUrl: './filtered-page.component.html',
//   styleUrls: ['./filtered-page.component.css']
// })
// export class FilteredPageComponent implements OnInit {
//   filteredProducts: product[] = [];

//   constructor(
//     private bookService: BookService,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.bookService.selectedCategory$.subscribe((category) => {
//       if (category) {
//         this.productService
//           .getProductsByCategory(category)
//           .subscribe((products) => {
//             this.filteredProducts = products;
//           });
//       } else {
//         // If no category is selected, show all products
//         this.productService.productList().subscribe((products) => {
//           this.filteredProducts = products;
//         });
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-filtered-page',
  templateUrl: './filtered-page.component.html',
  styleUrls: ['./filtered-page.component.css']
})
export class FilteredPageComponent implements OnInit {
  filteredProducts: product[] = [];
  discountAvailable = false;
  productData: undefined | product;
  discountTime: Date | undefined;
  discountPercent:number=0;
  imageBaseUrl=environment.ImageBaseUrl;

  constructor(
    private bookService: BookService,
    private productService: ProductService,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.discountPercent = this.product.discountPercent;

    this.product.discountAvailable.subscribe((isAvailable) => {
      this.discountAvailable = isAvailable;
    });

    this.product.discountTime.subscribe((endTime) => {
      this.discountTime = endTime;
    });
    this.bookService.selectedCategory$.subscribe((category) => {
      if (category) {
        this.productService
          .getProductsByCategory(category)
          .subscribe((products) => {
            this.filteredProducts = products;
          });
      } else {
        // If no category is selected, show all products
        this.productService.productList().subscribe((products) => {
          this.filteredProducts = products;
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
}
