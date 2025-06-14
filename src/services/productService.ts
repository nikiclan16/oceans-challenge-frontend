import axios from './api';

export const getProducts = async () => {
  const res = await axios.get('/products');
  return res.data;
};

export const createProduct = async (product: { name: string; price: number }) => {
  const res = await axios.post('/products', product);
  return res.data;
};
