import type { Order } from "../interfaces/orders";
import api from "./api";

export const createOrder = async (productIds: number[]): Promise<Order> => {
  const body = {
    products: productIds.map((id) => ({ productId: id })),
  };
  const res = await api.post("/orders", body);
  return res.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get("/orders");
  return res.data;
};

export const deleteOrder = async (orderId: number): Promise<Order> => {
  const res = await api.delete(`/orders/${orderId}`);
  return res.data;
};
