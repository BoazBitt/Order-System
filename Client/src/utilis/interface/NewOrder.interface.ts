import CustomerInterface from "./Customer.interface";
import ProductInterface from "./Product.interface";
export interface infoInterface {
  customers: CustomerInterface[];
  products: ProductInterface[];
}

export interface prodInterface {
  id: number;
  quantity: number;
}
export interface dataIntreface {
  customer: number;
  comments: string;
  products: prodInterface[];
}
