import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  imageBaseUrl=environment.ImageBaseUrl;
  allProducts: undefined | product[];
  ratings: { [key: string]: { ratingCount: number, totalRating: number, finalRating: any } } = {};
  ratingControl = new FormControl(0);

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.allProducts().subscribe((data) => {
      this.allProducts = data;
      this.loadRatingsFromStorage(); // Load ratings from Local Storage
    });
  }

  getRating(productId: string) {
    if (!this.ratings[productId]) {
      this.ratings[productId] = { ratingCount: 0, totalRating: 0, finalRating: 0 };
    }
    this.ratings[productId].ratingCount++;
    this.ratings[productId].totalRating += this.ratingControl?.value || 0;
    this.ratings[productId].finalRating = (this.ratings[productId].totalRating / this.ratings[productId].ratingCount).toFixed(2);
    console.log(this.ratingControl.value);

    this.saveRatingsToStorage(); // Save ratings to Local Storage
  }

  saveRatingsToStorage() {
    localStorage.setItem('ratings', JSON.stringify(this.ratings));
  }

  loadRatingsFromStorage() {
    const storedRatings = localStorage.getItem('ratings');
    if (storedRatings) {
      this.ratings = JSON.parse(storedRatings);
    }
  }
}

// import { Component, OnInit } from '@angular/core';
// import { product } from '../data-type';
// import { ProductService } from '../services/product.service';
// import { FormControl } from '@angular/forms';

// @Component({
//   selector: 'app-all-products',
//   templateUrl: './all-products.component.html',
//   styleUrls: ['./all-products.component.css']
// })
// export class AllProductsComponent implements OnInit {

//   allProducts:undefined|product[];
//   ratingcount=0;
//   totalrating=0;
//   Finalrating:any;
//   constructor(private product:ProductService){ }

//   ngOnInit(): void {
//     this.product.allProducts().subscribe((data)=>{
//       this.allProducts=data;
//     })
//   }
//   ratingcontrol = new FormControl(0);
// GetRating(){
//   this.ratingcount++;
//   this.totalrating+=this.ratingcontrol?.value||0;
//   this.Finalrating=(this.totalrating/this.ratingcount).toFixed(2)
//   console.log(this.ratingcontrol.value);

// }

// }
// import { Component, OnInit } from '@angular/core';
// import { product } from '../data-type';
// import { ProductService } from '../services/product.service';
// import { FormControl } from '@angular/forms';

// @Component({
//   selector: 'app-all-products',
//   templateUrl: './all-products.component.html',
//   styleUrls: ['./all-products.component.css']
// })
// export class AllProductsComponent implements OnInit {

//   allProducts: undefined | product[];
//   ratings: { [key: string]: { ratingCount: number, totalRating: number, finalRating: any } } = {};
//   ratingControl = new FormControl(0);

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.productService.allProducts().subscribe((data) => {
//       this.allProducts = data;
//     });
//   }

//   getRating(productId: string) {
//     if (!this.ratings[productId]) {
//       this.ratings[productId] = { ratingCount: 0, totalRating: 0, finalRating: 0 };
//     }
//     this.ratings[productId].ratingCount++;
//     this.ratings[productId].totalRating += this.ratingControl?.value || 0;
//     this.ratings[productId].finalRating = (this.ratings[productId].totalRating / this.ratings[productId].ratingCount).toFixed(2);
//     console.log(this.ratingControl.value);
//   }
// }
