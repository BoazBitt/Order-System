interface CustomerReportInterface {
  customer_id: number;
  customer_name: string;
  report: OrderItemInterface[];
}

interface OrderItemInterface {
  product_name: string;
  total_quantity: number;
  total_spent: number;
  type: string;
}

export default CustomerReportInterface;
