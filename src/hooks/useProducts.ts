import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById, getCategories, getProductsByCategory } from '../services/ProductService'
import type { Product } from '../types'

export function useProducts(){
    return useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getProducts
    })
}

export function useProduct(id: number){
     return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: () => getProductsByCategory(category),
    enabled: !!category,
  })
}