import api from './api';

export const createOrder = async (productIds: number[]) => {
  const body = {
    products: productIds.map((id) => ({ productId: id })),
  };
  const res = await api.post('/orders', body);
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get('/orders');
  return res.data;
};
