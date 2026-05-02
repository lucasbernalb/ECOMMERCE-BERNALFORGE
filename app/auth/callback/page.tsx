'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/**
 * Client-side auth callback page.
 *
 * Supabase email links redirect here with a hash fragment:
 *   /auth/callback#access_token=...&expires_at=...&type=signup
 *
 * This page:
 * 1. Reads the hash via Supabase's browser client (which can access window.location.hash)
 * 2. Exchanges it for a session
 * 3. Redirects to /account
 *
 * Configure in Supabase Dashboard → Auth → URL Configuration → Redirect URLs:
 *   Add: ${NEXT_PUBLIC_SITE_URL}/auth/callback
 */
export default function AuthCallbackPage() {
  const router = useRouter()
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return
    hasProcessed.current = true

    const supabase = createClient()

    // getSession() automatically processes the hash fragment if present
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[Auth Callback] Session error:', error.message)
        router.push('/auth/login')
        return
      }

      if (session) {
        router.push('/account')
      } else {
        // No session — probably already logged in or invalid link
        router.push('/auth/login')
      }
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative h-10 w-10 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">Verificando tu cuenta...</p>
      </div>
    </div>
  )
}
