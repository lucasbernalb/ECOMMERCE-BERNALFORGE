"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Hammer,
  LogOut,
  Settings,
  Package,
  Shield,
  ChevronDown,
  Grid3X3,
  Star,
  Flame,
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { CartSheet } from './cart-sheet'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Category } from '@/lib/types'

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { totalItems, toggleCart } = useCart()

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      if (data) {
        setCategories(data)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        setIsAdmin(profile?.is_admin ?? false)
      }

      setUser(user)
      setIsLoading(false)
    }

    checkAuth()

    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Sesión cerrada exitosamente')
    router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top bar */}
        <div className="hidden border-b border-border bg-muted/50 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
            <p className="text-muted-foreground">Envío gratis en pedidos mayores a $99</p>
            <div className="flex items-center gap-4">
              {!isLoading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <User className="h-4 w-4" />
                          <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">{user.email?.split('@')[0]}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/account">
                            <User className="mr-2 h-4 w-4" /> Mi Cuenta
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/account/orders">
                            <Package className="mr-2 h-4 w-4" /> Mis Pedidos
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/account/settings">
                            <Settings className="mr-2 h-4 w-4" /> Configuración
                          </Link>
                        </DropdownMenuItem>
                        {isAdmin && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href="/admin">
                                <Shield className="mr-2 h-4 w-4" /> Panel de Admin
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="text-destructive focus:text-destructive"
                        >
                          <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Link
                        href="/auth/login"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Iniciar Sesión
                      </Link>
                      <span className="text-border">|</span>
                      <Link
                        href="/auth/sign-up"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Crear Cuenta
                      </Link>
                    </div>
                  )}
                </>
              )}
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
            <nav className="hidden lg:flex items-center gap-1">
              {/* Products Dropdown */}
              <DropdownMenu open={productsOpen} onOpenChange={setProductsOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                    <Package className="h-4 w-4" />
                    <span>Productos</span>
                    <ChevronDown className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      productsOpen && "rotate-180"
                    )} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/todos-los-productos" className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="font-medium">Todos los Productos</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/todos-los-productos?filter=featured" className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-orange-500" />
                      <span>Productos Destacados</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/todos-los-productos?filter=bestseller" className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span>Los Más Vendidos</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Categories Dropdown */}
              <DropdownMenu open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                    <Grid3X3 className="h-4 w-4" />
                    <span>Categorías</span>
                    <ChevronDown className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      categoriesOpen && "rotate-180"
                    )} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 max-h-[400px] overflow-y-auto">
                  <DropdownMenuItem asChild>
                    <Link href="/todas-las-categorias" className="flex items-center gap-2">
                      <Grid3X3 className="h-4 w-4 text-primary" />
                      <span className="font-medium">Ver Todas las Categorías</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link href={`/categories/${category.slug}`}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar herramientas..."
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

              {/* Account - Auth Aware */}
              {!isLoading && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden h-9 w-9 items-center justify-center rounded-md hover:bg-accent sm:flex">
                      <User className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/account">Mi Cuenta</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">Mis Pedidos</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Panel de Admin</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-destructive focus:text-destructive"
                    >
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !isLoading ? (
                <Link
                  href="/auth/login"
                  className="hidden h-9 w-9 items-center justify-center rounded-md hover:bg-accent sm:flex"
                  aria-label="Sign In"
                >
                  <User className="h-5 w-5" />
                </Link>
              ) : null}

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
                  placeholder="Buscar herramientas..."
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
            mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0 border-t-0'
          )}
        >
          <nav className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-1">
              {/* Mobile Productos Section */}
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Productos
                </p>
                <Link
                  href="/todos-los-productos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <Package className="h-4 w-4 text-primary" />
                  Todos los Productos
                </Link>
                <Link
                  href="/todos-los-productos?filter=featured"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <Star className="h-4 w-4 text-orange-500" />
                  Productos Destacados
                </Link>
                <Link
                  href="/todos-los-productos?filter=bestseller"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <Flame className="h-4 w-4 text-orange-500" />
                  Los Más Vendidos
                </Link>
              </div>
              
              <div className="my-2 border-t border-border" />
              
              {/* Mobile Categories Section */}
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Categorías
                </p>
                <Link
                  href="/todas-las-categorias"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  <Grid3X3 className="h-4 w-4 text-primary" />
                  Ver Todas las Categorías
                </Link>
                {categories.slice(0, 4).map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                {categories.length > 4 && (
                  <Link
                    href="/todas-las-categorias"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-6 py-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
                  >
                    Ver todas las categorías →
                  </Link>
                )}
              </div>
              
              <div className="my-2 border-t border-border" />
              
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors sm:hidden"
              >
                <Heart className="h-4 w-4" />
                Favoritos
              </Link>
              {!isLoading && (
                <>
                  {user ? (
                    <>
                      <Link
                        href="/account"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Mi Cuenta
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          Panel de Admin
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          handleSignOut()
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors md:hidden"
                    >
                      Iniciar Sesión
                    </Link>
                  )}
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <CartSheet />
    </>
  )
}
