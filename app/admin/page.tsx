import { Package, FolderOpen, ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/isAdmin'

interface Stats {
  totalProducts: number
  totalCategories: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
}

interface Order {
  id: string
  customer_name: string
  customer_email: string
  total_amount: number
  status: string
  created_at: string
}

async function getStats(): Promise<Stats> {
  try {
    const supabase = await createClient()
    
    const [productsResult, categoriesResult, ordersResult] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('categories').select('id', { count: 'exact' }),
      supabase.from('orders').select('id, total_amount, status'),
    ])

    const totalProducts = productsResult.count ?? 0
    const totalCategories = categoriesResult.count ?? 0
    const orders = (ordersResult.data ?? []) as Pick<Order, 'id' | 'total_amount' | 'status'>[]
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0)
    const pendingOrders = orders.filter(order => order.status === 'pending').length

    return {
      totalProducts,
      totalCategories,
      totalOrders,
      totalRevenue,
      pendingOrders,
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
    }
  }
}

async function getRecentOrders(): Promise<Order[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      console.error('Error fetching recent orders:', error)
      return []
    }

    return (data ?? []) as Order[]
  } catch (error) {
    console.error('Error fetching recent orders:', error)
    return []
  }
}

export default async function AdminDashboard() {
  await requireAdmin()
  
  const [stats, recentOrders] = await Promise.all([
    getStats(),
    getRecentOrders(),
  ])

  const statCards = [
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Categories',
      value: stats.totalCategories,
      icon: FolderOpen,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 lg:grid-cols-2">
        {stats.pendingOrders > 0 && (
          <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/20">
                <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="font-semibold text-yellow-600 dark:text-yellow-400">
                  {stats.pendingOrders} Pending Orders
                </p>
                <p className="text-sm text-muted-foreground">
                  Orders waiting to be processed
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg border border-border">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No orders yet
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm">
                        {order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">${Number(order.total_amount).toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
