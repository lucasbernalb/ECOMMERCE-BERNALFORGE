"use client"

import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export interface WishlistToggleResult {
  success: boolean
  isInWishlist: boolean
  error?: string
}

/**
 * Toggles a product in the user's wishlist
 * - If not in wishlist: adds it
 * - If in wishlist: removes it
 * - If not logged in: shows error toast
 * 
 * @param productId - The ID of the product to toggle
 * @param onOptimisticUpdate - Optional callback for optimistic UI update
 * @returns Promise with success status and new wishlist state
 */
export async function toggleWishlist(
  productId: string,
  onOptimisticUpdate?: (isInWishlist: boolean) => void
): Promise<WishlistToggleResult> {
  const supabase = createClient()
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError) {
    console.error('Auth error:', authError)
    return { success: false, isInWishlist: false, error: 'Error de autenticación' }
  }
  
  if (!user) {
    toast.error('Iniciá sesión para agregar a favoritos')
    return { success: false, isInWishlist: false, error: 'Not authenticated' }
  }
  
  // Check if product is currently in wishlist
  const { data: existingItem, error: checkError } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()
  
  if (checkError && checkError.code !== 'PGRST116') {
    // PGRST116 = no rows returned (not in wishlist) - this is expected
    console.error('Error checking wishlist:', checkError)
    return { success: false, isInWishlist: false, error: 'Error al verificar favoritos' }
  }
  
  const isCurrentlyInWishlist = !!existingItem
  
  // Optimistic update
  onOptimisticUpdate?.(!isCurrentlyInWishlist)
  
  if (isCurrentlyInWishlist) {
    // Remove from wishlist
    const { error: deleteError } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)
    
    if (deleteError) {
      console.error('Error removing from wishlist:', deleteError)
      // Revert optimistic update
      onOptimisticUpdate?.(true)
      return { success: false, isInWishlist: true, error: 'Error al eliminar de favoritos' }
    }
    
    toast.success('Eliminado de favoritos')
    return { success: true, isInWishlist: false }
  } else {
    // Add to wishlist
    const { error: insertError } = await supabase
      .from('wishlist')
      .insert({ user_id: user.id, product_id: productId })
    
    if (insertError) {
      console.error('Error adding to wishlist:', insertError)
      // Revert optimistic update
      onOptimisticUpdate?.(false)
      return { success: false, isInWishlist: false, error: 'Error al agregar a favoritos' }
    }
    
    toast.success('Añadido a favoritos')
    return { success: true, isInWishlist: true }
  }
}

/**
 * Gets the user's wishlist product IDs
 * @returns Set of product IDs in wishlist, or empty set if not logged in
 */
export async function getWishlistProductIds(): Promise<Set<string>> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return new Set()
  }
  
  const { data, error } = await supabase
    .from('wishlist')
    .select('product_id')
    .eq('user_id', user.id)
  
  if (error) {
    console.error('Error fetching wishlist:', error)
    return new Set()
  }
  
  return new Set(data?.map(item => item.product_id) || [])
}
