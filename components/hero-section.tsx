"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, ShoppingCart, Star, Shield, Truck, 
  CreditCard, CheckCircle2, Zap, Play
} from 'lucide-react'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 17 })
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6 // Slow motion
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    { name: "Carlos M.", role: "Electricista", text: "La mejor inversión que hice para mi taller", rating: 5 },
    { name: "Roberto S.", role: "Constructor", text: "Resisten el uso diario sin fallar", rating: 5 },
  ]

  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-black">
      {/* Urgency Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 py-3 overflow-hidden">
        <div className="absolute inset-0 bg-[length:200%_100%] animate-gradient-shift bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 opacity-75" />
        <div className="relative mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm font-medium text-white">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Oferta Flash: 20% OFF en Taladros</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="flex items-center gap-1">
            <span>Termina en:</span>
            <span className="font-mono font-bold bg-black/20 px-2 py-0.5 rounded">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <Link 
            href="/search?tag=flash-sale" 
            className="hidden sm:inline-flex items-center gap-1 text-xs underline underline-offset-2 hover:text-orange-100"
          >
            Ver ofertas <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Full Screen Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Video Background - Sin efectos de animación para estabilidad */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onError={() => setIsVideoLoaded(false)}
        >
          <source src="/video-hero.webm" type="video/webm" />
          <source src="/video-hero.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback gradient si el video no carga */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
        )}
        
        {/* Dark Overlay for Content Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        
        {/* Orange Glow Accent */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[200px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:py-24 min-h-[calc(100vh-60px)] flex items-center">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-center w-full">
          
          {/* Left: Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-black bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                <span className="text-sm font-medium text-white">4.9/5</span>
                <span className="text-xs text-gray-300">• +10,000 clientes</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Trabaja más rápido,
                <span className="block mt-2 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  gasta menos
                </span>
              </h1>
              
              {/* Value Props */}
              <div className="flex flex-wrap gap-3">
                {['✓ Envío Gratis +$99', '✓ Garantía 2 años', '✓ Retorno 30 días'].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-400">
                    {item}
                  </span>
                ))}
              </div>

              <p className="max-w-xl text-xl text-gray-300 leading-relaxed">
                No vendemos solo herramientas. Vendemos <strong className="text-white">confianza</strong> para que puedas enfocarte en lo que importa: tu trabajo.
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-5">
              <Link
                href="/todas-las-categorias/power-tools"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-12 py-6 text-xl font-bold text-white shadow-2xl shadow-orange-500/40 transition-all duration-300 hover:shadow-orange-500/60 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingCart className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                <span>Comprar Ahora — 20% OFF</span>
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute -right-1 -top-1 rounded-bl-2xl rounded-tr-2xl bg-green-500 px-5 py-1.5 text-sm font-bold text-white">
                  -20%
                </div>
              </Link>

              {/* Microcopy */}
              <p className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-green-500" />
                  Pago seguro
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-orange-500" />
                  Envío 24-48h
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  Devolución gratis
                </span>
              </p>

              {/* Secondary CTA */}
              <Link
                href="/todas-las-categorias/power-tools"
                className="group inline-flex items-center gap-2 text-base font-medium text-gray-300 transition-colors hover:text-white"
              >
                <span>Ver todas las ofertas de temporada</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust Bar */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Pago 100% seguro</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm">Visa</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm">Mastercard</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm">MercadoPago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Social Proof Panel */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              
              {/* Featured Review Card */}
              <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">+2,847 reseñas verificadas</span>
                </div>
                
                <blockquote className="text-2xl font-medium text-white leading-relaxed mb-6">
                  "La mejor calidad que he probado en 15 años de oficio profesional."
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600">
                    <span className="text-lg font-bold text-white">MA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Miguel A.</p>
                    <p className="text-sm text-gray-400">Plomero profesional • Buenos Aires</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-white">500+</p>
                    <p className="text-xs text-gray-400 mt-1">Productos</p>
                  </div>
                  <div className="border-x border-white/10 px-6">
                    <p className="text-3xl font-bold text-orange-500">4.9</p>
                    <p className="text-xs text-gray-400 mt-1">Rating</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">24h</p>
                    <p className="text-xs text-gray-400 mt-1">Envío</p>
                  </div>
                </div>
              </div>

              {/* Hot Badge */}
              <div className="absolute -top-4 -right-4 rounded-full border border-orange-500/50 bg-orange-500/20 backdrop-blur-md px-5 py-2.5 shadow-lg">
                <span className="flex items-center gap-2 text-sm font-bold text-orange-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                  </span>
                  🔥 Hot Sale
                </span>
              </div>

              {/* Decorative */}
              <div className="absolute -z-10 -top-8 -right-8 h-40 w-40 rounded-full border border-orange-500/20" />
              <div className="absolute -z-10 -bottom-8 -left-8 h-32 w-32 rounded-full border border-orange-500/10" />
            </div>

            {/* Mini Testimonials */}
            <div className="mt-12 space-y-3">
              {testimonials.map((t, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600">
                    <span className="text-sm font-bold text-white">{t.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                    <p className="truncate text-sm text-gray-300">{t.text}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-xs text-gray-400 uppercase tracking-widest">Explora</span>
        <div className="h-14 w-7 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="h-3 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-orange-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
