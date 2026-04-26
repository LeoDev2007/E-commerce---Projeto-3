export interface User {
  id: number
  nome: string
  email: string
}

export interface Product {
  id: number
  title: string
  price: number
  rating: number
  thumbnail: string
  description: string
  discountPercentage: number
  category?: string
  brand: string
  images: string[]
  tags: string[]
  weight?: number
  stock: number
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  sku: string
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  reviews: Review[]
}

export interface CartItem {
  id: number
  title: string
  thumbnail: string
  unitPrice: number
  price: number
  quantity: number
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}