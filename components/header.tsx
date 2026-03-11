"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { ShoppingCart, Heart, User, Search, Menu, X, Sun, Moon, Hammer } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { CartSheet } from './cart-sheet'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'Power Tools', href: '/category/power-tools' },
  { name: 'Hand Tools', href: '/category/hand-tools' },
  { name: 'Construction', href: '/category/construction-tools' },
  { name: 'Safety Equipment', href: '/category/safety-equipment' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, setTheme } = useTheme()
  const { totalItems, toggleCart } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top bar */}
        <div className="hidden border-b border-border bg-muted/50 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
            <p className="text-muted-foreground">Free shipping on orders over $99</p>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Link>
              <span className="text-border">|</span>
              <Link href="/auth/sign-up" className="text-muted-foreground hover:text-foreground transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <Hammer className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden text-xl font-bold tracking-tight sm:block">
                BernalForge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search tools & equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent md:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden h-9 w-9 items-center justify-center rounded-md hover:bg-accent sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden h-9 w-9 items-center justify-center rounded-md hover:bg-accent sm:flex"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent lg:hidden"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="border-t border-border py-3 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search tools & equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
              </div>
            </form>
          )}
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'overflow-hidden border-t border-border lg:hidden transition-all duration-200',
            mobileMenuOpen ? 'max-h-96' : 'max-h-0 border-t-0'
          )}
        >
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors sm:hidden"
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors sm:hidden"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors md:hidden"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <CartSheet />
    </>
  )
}
