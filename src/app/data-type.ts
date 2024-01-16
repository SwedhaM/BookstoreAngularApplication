import { FormControl } from "@angular/forms";

export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: String;
  password: String;
}
export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmpassword:string;
  address:string;
  phonenumber:string;
  role:string;
}
export interface LoginData {
  email: String;
  password: String;
  role:string;
}
export interface product{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  imageFile?:File,
  authorname:string,
  description:string,
  id:number,
  expanded?: boolean;
  truncatedDescription?: string;

  quantity:undefined | number,
  productId:undefined|number
}
export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number| undefined,
  quantity:undefined | number,
  productId:number,
  userId:number,
  originalPrice?: number;
  discountedPrice?: number;
}

export interface priceSummary{
  price:number,
  discountedPrice?:number,
  // discount:number,
  tax:number,
  delivery:number,
  total:number
  originalPrice:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  name:string,
  totalPrice:number,
  userId:string,
  id:number|undefined
}

export interface ConfigData {
  discountPercent: number;
  startTime: Date;
  endTime: Date;
}
