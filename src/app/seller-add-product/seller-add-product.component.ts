// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-seller-add-product',
//   templateUrl: './seller-add-product.component.html',
//   styleUrls: ['./seller-add-product.component.css']
// })
// export class SellerAddProductComponent implements OnInit {
//   addProductMessage:string|undefined;
//   constructor(private product:ProductService) { }

//   ngOnInit():void {
//   }
//   submit(data:product){
//     this.product.addProduct(data).subscribe((result)=>{
//       console.warn(result)
//       if(result){
//         this.addProductMessage="Product is Added Successfully";
//       }
//     });
//     setTimeout(()=>{
//       this.addProductMessage=undefined
//     },3000);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage:string|undefined;
  frm!:FormGroup;
  // product:Product = {id:0,productName:'',productImage:''};
  imageFile?:File;
  constructor(private product:ProductService,private fb:FormBuilder) { }
  get f(){
    return this.frm.controls;
  }

  onPost(){
    this.addProductMessage= environment.addProductMessage.waitMessage;

    const frmData:product= Object.assign(this.frm.value);
    frmData.imageFile=this.imageFile;
    this.product.add(frmData).subscribe({
      next:(res)=>{
        this.addProductMessage= environment.addProductMessage.ProductMessage;
      },
      error: (err)=>{
       this.addProductMessage=  environment.addProductMessage.Error;
        console.log(err);
      }
    })
  }
  onChange(event:any){
    this.imageFile=event.target.files[0];
   }

 ngOnInit(): void {
   this.frm = this.fb.group({
     'id':[0],
     'name':['',Validators.required],
     'price':['',Validators.required],
     'category':['',Validators.required],
     'color':['',Validators.required],
     'authorname':['',Validators.required],
     'description':['',Validators.required],
     'imageFile':[]
   })
 }
}
