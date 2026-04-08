"use server"

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { CartItem } from '@/lib/cart-context'
import type { Order } from '@/lib/types'

export interface CreateOrderInput {
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  shippingCity: string
  postalCode: string
  totalAmount: number
  paymentMethod: 'card' | 'paypal'
  items: CartItem[]
}

export interface CreateOrderResult {
  success: boolean
  orderId?: string
  error?: string
}

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  try {
    // Validate input
    if (!input.customerName.trim()) {
      return { success: false, error: "Customer name is required" }
    }
    if (!input.customerEmail.trim() || !input.customerEmail.includes('@')) {
      return { success: false, error: "Valid email is required" }
    }
    if (!input.customerPhone.trim()) {
      return { success: false, error: "Phone number is required" }
    }
    if (!input.shippingAddress.trim()) {
      return { success: false, error: "Shipping address is required" }
    }
    if (!input.shippingCity.trim()) {
      return { success: false, error: "City is required" }
    }
    if (!input.postalCode.trim()) {
      return { success: false, error: "Postal code is required" }
    }
    if (input.items.length === 0) {
      return { success: false, error: "Cart is empty" }
    }
    if (input.totalAmount <= 0) {
      return { success: false, error: "Invalid order total" }
    }

    const supabase = await createClient()

    // Get current user (if logged in)
    const { data: { user } } = await supabase.auth.getUser()

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user?.id || null,
        customer_name: input.customerName.trim(),
        customer_email: input.customerEmail.trim().toLowerCase(),
        customer_phone: input.customerPhone.trim(),
        shipping_address: input.shippingAddress.trim(),
        shipping_city: input.shippingCity.trim(),
        postal_code: input.postalCode.trim(),
        total_amount: input.totalAmount,
        status: 'pending',
        payment_method: input.paymentMethod,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return { success: false, error: "Failed to create order" }
    }

    // Create order items
    const orderItems = input.items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      product_price: item.product.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      // Rollback: delete the order
      await supabase.from('orders').delete().eq('id', order.id)
      return { success: false, error: "Failed to create order items" }
    }

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error('Unexpected error in createOrder:', error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return (data ?? []) as Order[]
}
