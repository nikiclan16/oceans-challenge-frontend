export interface OrderProduct {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  order_id: number;
  created_at: string;
  total: number;
  products: OrderProduct[];
}
