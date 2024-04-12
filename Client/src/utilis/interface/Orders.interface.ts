interface ProductDetail {
  id: number;
  prodName: string;
}

export interface OrderItem {
  product: ProductDetail;
  quantity: number;
}

export default interface OrderInterface {
  id: number;
  order_number: string;
  customer: number;
  comments: string;
  creation_date: string;
  last_update_date: string;
  products: OrderItem[];
}
