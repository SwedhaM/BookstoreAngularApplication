// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';
// import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'

// @Component({
//   selector: 'app-seller-home',
//   templateUrl: './seller-home.component.html',
//   styleUrls: ['./seller-home.component.css']
// })
// export class SellerHomeComponent implements OnInit {
//   productList:undefined | product[];
//   productMessage:undefined | string;
//   icon=faTrash;
//   iconEdit=faEdit;
//   constructor(private product:ProductService) { }

//   ngOnInit() :void{
//     this.list();
//   }
//   deleteProduct(id:number){
//     this.product.deleteProduct(id).subscribe((result)=>{
//       if(result){
//         this.productMessage="Product is deleted";
//         this.list();
//       }
//     });
//     setTimeout(() => {
//       this.productMessage=undefined
//     }, 3000);
//   }

//   list(){
//     this.product.productList().subscribe((result)=>{
//       if(result){
//         this.productList=result;
//       }
//     })
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[];
  productMessage:undefined | string;

  products!:product[];
  imageBaseUrl=environment.ImageBaseUrl;
  icon=faTrash;
  iconEdit=faEdit;
  constructor(private product:ProductService) { }

  ngOnInit() :void{
    this.getProducts();
  }
  toggleDescription(item: product) {
    if (item.expanded) {
      item.expanded = false;
    } else {
      item.expanded = true;
      item.truncatedDescription = item.description.split(' ').slice(0, 3).join(' ');
    }
  }

  // toggleDescription(item: product) {
  //   item.expanded = !item.expanded;

  //   if (item.expanded) {
  //     item.truncatedDescription = item.description.split(' ').slice(0, 3).join(' ');
  //   }
  // }

  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is deleted";
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage=undefined
    }, 3000);
  }

  list(){
    this.product.productList().subscribe((result)=>{
      if(result){
        this.productList=result;
      }
    })
  }

  getProducts(){
    this.product.getAll().subscribe({
      next:(resp)=>{
        this.products=resp;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
