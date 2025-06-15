import type { Product, ProductListResponse } from "../interfaces/products";
import api from "./api";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products/all");
  return res.data;
};

export const createProduct = async (product: {
  name: string;
  price: number;
}) => {
  const res = await api.post("/products", product);
  return res.data;
};

export const updateProduct = async (
  id: number,
  data: { name: string; price: number }
): Promise<Product> => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProductById = async (id: number): Promise<Product> => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const getPaginatedProducts = async (
  page = 1,
  limit = 5
): Promise<ProductListResponse> => {
  const res = await api.get(`/products?page=${page}&limit=${limit}`);
  console.log("resProductService:", res);
  return res.data;
};
