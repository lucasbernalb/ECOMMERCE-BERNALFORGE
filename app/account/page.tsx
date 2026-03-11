"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, User, Package, Heart, LogOut, Settings } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { toast } from 'sonner'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)

      if (!user) {
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Account</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="rounded-lg border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                href="/account/settings"
                className="text-sm text-primary hover:underline"
              >
                Edit Profile
              </Link>
            </div>

            {/* Orders */}
            <Link
              href="/account/orders"
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Orders</h3>
                  <p className="text-sm text-muted-foreground">
                    View your order history
                  </p>
                </div>
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Wishlist</h3>
                  <p className="text-sm text-muted-foreground">
                    Items you&apos;ve saved
                  </p>
                </div>
              </div>
            </Link>

            {/* Settings */}
            <Link
              href="/account/settings"
              className="rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage account settings
                  </p>
                </div>
              </div>
            </Link>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-border p-6 hover:border-destructive/50 hover:bg-destructive/5 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <LogOut className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold">Sign Out</h3>
                  <p className="text-sm text-muted-foreground">
                    Log out of your account
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
