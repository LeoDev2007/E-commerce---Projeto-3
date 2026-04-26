import { api } from "./api";
import type { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products?limit=0");
  return data.products;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get("/products/category-list");
  return data;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data } = await api.get(`/products/category/${category}`)
  return data.products
}