import axios from './api';

export const getProducts = async () => {
  const res = await axios.get('/products');
  return res.data;
};

export const createProduct = async (product: { name: string; price: number }) => {
  const res = await axios.post('/products', product);
  return res.data;
};

export const updateProduct = async (id: number, data: { name: string; price: number }) => {
  const res = await axios.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProductById = async (id: number) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};
