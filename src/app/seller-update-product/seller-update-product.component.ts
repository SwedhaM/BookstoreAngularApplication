// import { Component, OnInit } from '@angular/core';
// import { product } from '../data-type';
// import { Action } from 'rxjs/internal/scheduler/Action';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';

// @Component({
//   selector: 'app-seller-update-product',
//   templateUrl: './seller-update-product.component.html',
//   styleUrls: ['./seller-update-product.component.css']
// })
// export class SellerUpdateProductComponent implements OnInit {
//   productData: undefined | product;
//   productMessage: undefined | string;
//   constructor(private route:ActivatedRoute,private product:ProductService) { }

//   ngOnInit():void {
//     let productId=this.route.snapshot.paramMap.get('id')
//     console.warn(productId);
//     productId && this.product.getProduct(productId).subscribe((data)=>{
//       console.warn(data)
//       this.productData=data;
//     })
//   }
//   submit(data:any){

//     if(this.productData){
//       data.id=this.productData.id;
//     }
//     this.product.updateProduct(data).subscribe((result)=>{
//       if(result){
//         this.productMessage="Product has been updated Successfully";
//       }
//     })
//     setTimeout(() => {
//       this.productMessage=undefined;
//     }, 3000);
//     console.warn(data)
//   }

// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-seller-update-product',
//   templateUrl: './seller-update-product.component.html',
//   styleUrls: ['./seller-update-product.component.css']
// })
// export class SellerUpdateProductComponent implements OnInit {
//   frm!: FormGroup;
//   productData: product | undefined;
//   productMessage: string | undefined;
//   imageFile?:File;

//   constructor(
//     private route: ActivatedRoute,
//     private product: ProductService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.initForm();

//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.product.getProduct(productId).subscribe((data) => {
//         this.productData = data;
//         this.patchFormValues(data);
//       });
//     }
//   }
//   onPost() {
//     this.productMessage = 'Wait..';

//     const frmData: product = Object.assign(this.frm.value);
//     frmData.imageFile = this.imageFile;

//     this.product.updateProduct(frmData).subscribe(
//       () => {
//         this.productMessage = 'Product has been updated successfully';
//       },
//       (error) => {
//         this.productMessage = 'Error updating product. Please try again.';
//         console.log(error);
//       }
//     );
//   }

//   onChange(event:any){
//     this.imageFile=event.target.files[0];
//    }
//   initForm(): void {
//     this.frm = this.fb.group({
//       name: ['', Validators.required],
//       price: ['', Validators.required],
//       category: ['', Validators.required],
//       color: ['', Validators.required],
//       authorname: ['', Validators.required],
//       description: ['', Validators.required],
//       imageFile:[]
//     });
//   }
//   get f(){
//     return this.frm.controls;
//   }
//   patchFormValues(product: product): void {
//     this.frm.patchValue({
//       name: product.name,
//       price: product.price,
//       category: product.category,
//       color: product.color,
//       authorname: product.authorname,
//       description: product.description,
//       imageFile:product.imageFile
//     });
//   }
//   submit(formData: any): void {
//     this.product.updateProduct(formData).subscribe(
//       () => {
//         this.productMessage = 'Product has been updated successfully';
//       },
//       (error) => {
//         this.productMessage = 'Error updating product. Please try again.';
//         console.log(error);
//       }
//     );

//     setTimeout(() => {
//       this.productMessage = undefined;
//     }, 3000);
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-seller-update-product',
//   templateUrl: './seller-update-product.component.html',
//   styleUrls: ['./seller-update-product.component.css'],
// })
// export class SellerUpdateProductComponent implements OnInit {
//   frm!: FormGroup;
//   productMessage: string | undefined;
//   imageFile?: File;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.initForm();

//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.productService.getProduct(productId).subscribe((product) => {
//         this.patchFormValues(product);
//       });
//     }
//   }

//   onImageChange(event: any): void {
//     this.imageFile = event.target.files[0];
//   }

//   initForm(): void {
//     this.frm = this.fb.group({
//       name: ['', Validators.required],
//       price: ['', Validators.required],
//       category: ['', Validators.required],
//       color: ['', Validators.required],
//       authorname: ['', Validators.required],
//       description: ['', Validators.required],
//     });
//   }

//   get f() {
//     return this.frm.controls;
//   }

//   patchFormValues(product: product): void {
//     this.frm.patchValue(product);
//   }

//   submit(): void {
//     this.productMessage = 'Updating product...';

//     const productId = this.route.snapshot.paramMap.get('id');
//     if (!productId) {
//       this.productMessage = 'Product ID not found.';
//       return;
//     }

//     const formData: any = { ...this.frm.value };
//     formData.productId = productId;
//     formData.imageFile = this.imageFile;

//     this.productService.updateProduct(formData).subscribe(
//       () => {
//         this.productMessage = 'Product has been updated successfully';
//       },
//       (error) => {
//         this.productMessage = 'Error updating product. Please try again.';
//         console.log(error);
//       }
//     );
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-type';

// @Component({
//   selector: 'app-seller-update-product',
//   templateUrl: './seller-update-product.component.html',
//   styleUrls: ['./seller-update-product.component.css'],
// })
// export class SellerUpdateProductComponent implements OnInit {
//   frm!: FormGroup;
//   productData: undefined | product;
//   productMessage: string | undefined;
//   imageFile?: File;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.initForm();

//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.productService.getProduct(productId).subscribe((product) => {
//         this.productData = product;
//         this.patchFormValues(product);
//       });
//     }
//   }

//   onImageChange(event: any): void {
//     this.imageFile = event.target.files[0];
//   }

//   initForm(): void {
//     this.frm = this.fb.group({
//       name: ['', Validators.required],
//       price: ['', Validators.required],
//       category: ['', Validators.required],
//       color: ['', Validators.required],
//       authorname: ['', Validators.required],
//       description: ['', Validators.required],
//     });
//   }

//   get f() {
//     return this.frm.controls;
//   }

//   patchFormValues(product: product): void {
//     this.frm.patchValue(product);
//   }

//   submit(): void {
//     this.productMessage = 'Updating product...';

//     const productId = this.route.snapshot.paramMap.get('id');
//     if (!productId) {
//       this.productMessage = 'Product ID not found.';
//       return;
//     }

//     const id = parseInt(productId, 10); // Convert to number if necessary

//     const formData: any = { ...this.frm.value };
//     formData.imageFile = this.imageFile;

//     this.productService.updateProduct(id, formData).subscribe(
//       () => {
//         this.productMessage = 'Product has been updated successfully';
//       },
//       (error) => {
//         this.productMessage = 'Error updating product. Please try again.';
//         console.log(error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  frm!: FormGroup;
  productData: undefined | product;
  productMessage: string | undefined;
  imageFile?: File;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((product) => {
        this.productData = product;
        this.patchFormValues(product);
      });
    }
  }

  onImageChange(event: any): void {
    this.imageFile = event.target.files[0];
  }

  initForm(): void {
    this.frm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      authorname: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() {
    return this.frm.controls;
  }

  patchFormValues(product: product): void {
    this.frm.setValue({
      name: product.name,
      price: product.price,
      category: product.category,
      color: product.color,
      authorname: product.authorname,
      description: product.description,
    });
  }


  submit(): void {
    this.productMessage = environment.productUpdateMessage.UpdatingMessage;

    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.productMessage = environment.productUpdateMessage.NotFound;
      return;
    }

    const id = parseInt(productId, 10); // Convert to number if necessary

    const formData: any = { ...this.frm.value };
    formData.imageFile = this.imageFile;

    this.productService.updateProduct(id, formData).subscribe(
      () => {
        this.productMessage = environment.productUpdateMessage.Success;
      },
      (error) => {
        this.productMessage = environment.productUpdateMessage.Error;
        console.log(error);
      }
    );
  }
}
