import axios from './api';

export const createOrder = async (productIds: number[]) => {
  const body = {
    products: productIds.map((id) => ({ productId: id })),
  };
  const res = await axios.post('/orders', body);
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get('/orders');
  return res.data;
};

export const deleteOrder = async (orderId: number) => {
  const res = await axios.delete(`/orders/${orderId}`);
  return res.data;
};