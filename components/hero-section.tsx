import Link from 'next/link'
import { ArrowRight, Shield, Truck, Headphones } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              Professional Grade Tools
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Built for Those Who{' '}
              <span className="text-primary">Build</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Premium power tools, hand tools, and safety equipment trusted by professionals. 
              Quality that lasts, performance that delivers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/category/power-tools"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Shop Power Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/category/hand-tools"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
              >
                Browse Hand Tools
              </Link>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="aspect-square rounded-xl bg-card border border-border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-3xl font-bold text-primary">500+</span>
                  <span className="text-xs text-muted-foreground mt-1">Products</span>
                </div>
                <div className="aspect-square rounded-xl bg-card border border-border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <span className="text-xs text-muted-foreground mt-1">Brands</span>
                </div>
                <div className="aspect-square rounded-xl bg-card border border-border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-3xl font-bold text-primary">10k+</span>
                  <span className="text-xs text-muted-foreground mt-1">Customers</span>
                </div>
                <div className="aspect-square rounded-xl bg-card border border-border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-3xl font-bold text-primary">4.9</span>
                  <span className="text-xs text-muted-foreground mt-1">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $99</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Warranty Included</h3>
              <p className="text-sm text-muted-foreground">Manufacturer guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Headphones className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Expert Support</h3>
              <p className="text-sm text-muted-foreground">Talk to professionals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
