export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  price: number
  stock: number
  category_id: string | null
  description: string | null
  technical_specs: Record<string, string | number | string[]> | null
  images: string[]
  featured: boolean
  best_seller: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export type ProductWithCategory = Product & {
  category?: Category
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  user_id: string | null
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  shipping_city: string
  postal_code: string
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: 'mercadopago' | 'whatsapp' | 'email'
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_price: number
  quantity: number
  created_at: string
  product?: Product
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

export interface Profile {
  id: string
  email: string | null
  is_admin: boolean
  created_at: string
}

export interface FilterOptions {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'popular'
  search?: string
}
