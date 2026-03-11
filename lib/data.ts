import { createClient } from '@/lib/supabase/server'
import type { Category, Product, ProductWithCategory } from './types'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

export async function getProducts(options?: {
  categoryId?: string
  featured?: boolean
  bestSeller?: boolean
  limit?: number
  search?: string
}): Promise<ProductWithCategory[]> {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .order('created_at', { ascending: false })

  if (options?.categoryId) {
    query = query.eq('category_id', options.categoryId)
  }

  if (options?.featured) {
    query = query.eq('featured', true)
  }

  if (options?.bestSeller) {
    query = query.eq('best_seller', true)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,brand.ilike.%${options.search}%,description.ilike.%${options.search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductWithCategory[]> {
  const category = await getCategoryBySlug(categorySlug)
  if (!category) return []

  return getProducts({ categoryId: category.id })
}

export async function getFeaturedProducts(limit = 8): Promise<ProductWithCategory[]> {
  return getProducts({ featured: true, limit })
}

export async function getBestSellers(limit = 8): Promise<ProductWithCategory[]> {
  return getProducts({ bestSeller: true, limit })
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<ProductWithCategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(limit)

  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }

  return data || []
}

export async function searchProducts(query: string): Promise<ProductWithCategory[]> {
  return getProducts({ search: query })
}
