"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ShoppingCart, Star, Shield, Truck,
  CheckCircle2, Zap, CreditCard
} from 'lucide-react'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6
    }
  }, [])

  const brands = ['DeWalt', 'Makita', 'Bosch', 'Milwaukee', 'Stanley']

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Rich Ambient Background */}
      <div className="absolute inset-0 z-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        
        {/* Cinematic Orange Glows */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-500/8 rounded-full blur-[280px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[220px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange-400/3 rounded-full blur-[180px]" />
        
        {/* Depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
      </div>

      {/* Content Layer - Better proportions */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 lg:px-8 py-5 lg:py-6 min-h-[calc(100vh-3.5rem)] flex items-center">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center w-full">
          
          {/* LEFT: Content - Reduced spacing */}
          <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
              <div className="flex -space-x-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-black bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[8px] font-bold text-white">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                <span className="text-sm font-semibold text-white">4.9/5</span>
                <span className="text-xs text-gray-400">• +10K clientes</span>
              </div>
            </div>

            {/* Headline - Smaller, cleaner */}
            <div className="space-y-2.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Herramientas
                <span className="block mt-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  que cuestan menos
                </span>
              </h1>
              
              {/* Value Props - More compact */}
              <div className="flex flex-wrap gap-3 pt-0.5">
                {[
                  { icon: Truck, text: 'Envío gratis +$99', color: 'text-green-400' },
                  { icon: Shield, text: 'Garantía 2 años', color: 'text-blue-400' },
                  { icon: CheckCircle2, text: '30 días devolver', color: 'text-purple-400' }
                ].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Subheadline - Compact */}
            <p className="max-w-md text-sm text-gray-300 leading-relaxed">
              No vendemos solo herramientas. Vendemos <strong className="text-white">confianza</strong> para que te enfoques en tu trabajo.
            </p>

            {/* CTAs - Proper horizontal gap */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {/* Primary CTA */}
              <Link
                href="/todas-las-categorias/herramientas-electricas"
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-3.5 text-base font-bold text-white shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Comprar Ahora</span>
                <ArrowRight className="h-4 w-4" />
                <div className="absolute -right-0.5 -top-0.5 rounded-bl-xl rounded-tr-xl bg-green-500 px-3 py-1 text-xs font-bold text-white">
                  -20%
                </div>
              </Link>

              {/* Secondary CTA - Lighter */}
              <Link
                href="/todos-los-productos"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                <span>Ver todos los productos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Microcopy */}
            <p className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" /> Pago seguro
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" /> Envío 24-48h
              </span>
            </p>

            {/* Premium Brands Strip */}
            <div className="pt-0.5">
              <p className="text-[10px] text-gray-600 mb-2.5 uppercase tracking-widest">Marcas líderes</p>
              <div className="flex items-center gap-6">
                {brands.map((brand, i) => (
                  <span key={i} className="text-sm font-semibold tracking-wide text-gray-400">{brand}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Larger Video Container */}
          <div className={`hidden lg:block transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
              {/* Video Container - 30% larger, cinematic 16:10 */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_100px_-30px_rgba(249,115,22,0.1)] aspect-[16/10] bg-zinc-900">
                
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/imagenhero.avif"
                  onLoadedData={() => setIsVideoLoaded(true)}
                  onCanPlay={() => setIsVideoLoaded(true)}
                  onError={() => setIsVideoLoaded(false)}
                >
                  <source src="/video-hero.mp4" type="video/mp4" />
                </video>

                {/* Fallback loader while video loads */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative h-10 w-10">
                        <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" />
                      </div>
                      <p className="text-xs text-gray-500 animate-pulse">Cargando...</p>
                    </div>
                  </div>
                )}
                
                {/* Rich Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />
                
                {/* Bottom Info Card */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-md px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Herramientas Industriales</span>
                      <span className="flex items-center gap-1.5 text-xs text-orange-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Premium
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ambient Orange Glow - Reflection Effect */}
                <div className="absolute -bottom-24 -right-16 h-48 w-48 bg-orange-500/15 rounded-full blur-[70px] pointer-events-none" />
                <div className="absolute -top-16 -left-16 h-32 w-32 bg-orange-400/10 rounded-full blur-[60px] pointer-events-none" />
              </div>

              {/* Decorative corner elements for editorial feel */}
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-orange-500/30 rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-orange-500/20 rounded-bl-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <span className="text-[10px] text-gray-600 uppercase tracking-widest">Explora</span>
        <div className="h-7 w-4.5 rounded-full border border-white/15 flex items-start justify-center p-0.5">
          <div className="h-1.5 w-0.5 rounded-full bg-gradient-to-b from-orange-500 to-orange-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}