import { requireAdmin } from '@/lib/auth/isAdmin'
import { getOrders } from '@/lib/actions/orders'
import { AdminOrdersClient } from './orders-client'

export default async function AdminOrdersPage() {
  // Server-side admin check
  const adminResult = await requireAdmin()
  
  if (!adminResult.isAdmin) {
    return null
  }

  // Fetch orders server-side
  const orders = await getOrders()

  return <AdminOrdersClient initialOrders={orders} />
}
