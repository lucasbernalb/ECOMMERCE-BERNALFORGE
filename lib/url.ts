/**
 * Centralized URL utilities for the application.
 * All URL construction goes through here — never hardcode base URLs.
 */

/**
 * Build a full URL by appending a path to the site's base URL.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL env var (explicit config)
 * 2. window.location.origin (client-side, e.g. during SSR hydration)
 * 3. http://localhost:3000 (server-side dev fallback)
 *
 * @example
 * getSiteUrl('/account')            // → http://localhost:3000/account
 * getSiteUrl('/auth/callback')      // → https://bernalforge.com/auth/callback
 * getSiteUrl()                      // → https://bernalforge.com
 */
export function getSiteUrl(path = ''): string {
  let base: string

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    base = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
  } else if (typeof window !== 'undefined') {
    base = window.location.origin
  } else {
    base = 'http://localhost:3000'
  }

  if (!path) return base

  const safePath = path.startsWith('/') ? path : `/${path}`
  return `${base}${safePath}`
}
