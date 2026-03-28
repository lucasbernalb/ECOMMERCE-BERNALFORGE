# Agent Guidelines for BernalForge E-commerce

This document provides guidelines for AI agents working in this codebase.

---

## Project Overview

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase, Radix UI, Sonner (toasts)

**Structure:**
- `app/` - Next.js App Router pages (route-based)
- `components/` - React components
  - `components/ui/` - Reusable UI primitives (shadcn/ui style)
- `lib/` - Utilities, types, Supabase clients, context
- `hooks/` - Custom React hooks (if added)

---

## Build/Lint/Test Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# TypeScript type checking
npx tsc --noEmit

# ESLint (if configured)
npm run lint
```

---

## Code Style Guidelines

### TypeScript Conventions

- **Strict Mode:** TypeScript strict mode is enabled (`strict: true`)
- **Explicit Types:** Always provide explicit types for function parameters and return values
- **No Implicit Any:** Avoid `any` type; use `unknown` for truly unknown types
- **Type Imports:** Use `import type` for type-only imports

```typescript
// Good
import { useState } from 'react'
import type { Product } from '@/lib/types'
const [count, setCount] = useState<number>(0)

// Bad
const [count, setCount] = useState(0) // implicit any warning
```

### File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`, `CartSheet.tsx`)
- Utilities/hooks: `camelCase.ts` (e.g., `useCart.ts`, `utils.ts`)
- Pages: `page.tsx` (App Router convention)
- Types: `types.ts` in `lib/`

### Component Structure

```typescript
// Client components must include 'use client' directive
"use client"

import * as React from 'react'
import { SomeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComponentNameProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

export function ComponentName({ className, variant = 'default' }: ComponentNameProps) {
  return (
    <div className={cn('base-styles', className)}>
      {/* content */}
    </div>
  )
}
```

### Import Organization

Order imports:
1. React/Next.js built-ins
2. Third-party libraries (lucide-react, radix-ui, etc.)
3. Internal imports (@/lib, @/components)
4. Relative imports (./utils, ../types)

```typescript
// Example
import * as React from 'react'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
```

### Tailwind CSS

- Use Tailwind 4 (no tailwind.config.js, uses CSS-based config)
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Use design tokens via CSS variables (e.g., `bg-primary`, `text-muted-foreground`)

```typescript
// Good
<div className={cn(
  'flex items-center gap-2 p-4',
  isActive && 'bg-primary text-primary-foreground',
  className
)} />

// Bad
<div className={`flex items-center gap-2 p-4 ${isActive ? 'bg-primary' : ''}`} />
```

### State Management

- Use React Context for global state (see `lib/cart-context.tsx` as example)
- Use `useState` for local component state
- Use `useReducer` for complex state logic

### Error Handling

- Use try/catch for async operations
- Display errors via Sonner toasts: `toast.error('Error message')`
- Console log errors for debugging

```typescript
try {
  const { data, error } = await supabase.from('products').select('*')
  if (error) throw error
  setProducts(data)
} catch (error) {
  console.error('Error loading products:', error)
  toast.error('Failed to load products')
}
```

### API Routes / Server Components

- Server components by default (no 'use client')
- Use `async/await` in Server Components
- Client components must be explicitly marked with 'use client'

---

## Supabase Integration

### Required Environment Variables

Create a `.env.local` file based on `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/account
```

### Supabase Client Usage

```typescript
// Client-side
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

// Server-side / Middleware
import { createServerClient } from '@supabase/ssr'
```

---

## Database Types

All types are defined in `lib/types.ts`:
- `Category`, `Product`, `ProductWithCategory`
- `CartItem`, `Order`, `OrderItem`, `WishlistItem`
- `Profile`, `FilterOptions`

---

## Important Notes

1. **No ESLint configured:** Currently no ESLint rules are active. TypeScript strict mode is the primary safeguard.

2. **No test framework:** The project currently has no test suite. Do not write tests unless explicitly requested.

3. **Middleware exists:** `middleware.ts` in root handles Supabase session updates and admin route protection.

4. **Theme System:** Uses `next-themes` with dark mode default. ThemeProvider wraps the app.

5. **Avoid magic numbers:** Use constants for repeated values.

6. **Accessibility:** Use Radix UI primitives for accessible components. Include proper ARIA attributes for custom components.

7. **Responsive Design:** Use Tailwind responsive prefixes (sm:, md:, lg:, xl:) for mobile-first layouts.
