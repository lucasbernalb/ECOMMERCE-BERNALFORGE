import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface AdminCheckResult {
  isAdmin: boolean
  userId: string | null
}

export async function checkAdmin(): Promise<AdminCheckResult> {
  try {
    const supabase = await createClient()
    
    // Try to get current user
    let { data: { user }, error: getUserError } = await supabase.auth.getUser()

    // If no user from cookies, try refreshing session
    if (!user) {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
      if (refreshError) {
        console.error('Session refresh error:', refreshError)
      }
      user = refreshData?.user ?? null
    }

    if (!user) {
      return { isAdmin: false, userId: null }
    }

    // Query profile with admin check
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
      return { isAdmin: false, userId: user.id }
    }

    return {
      isAdmin: profile?.is_admin ?? false,
      userId: user.id,
    }
  } catch (error) {
    console.error('Unexpected error in checkAdmin:', error)
    return { isAdmin: false, userId: null }
  }
}

export async function requireAdmin(): Promise<AdminCheckResult> {
  const result = await checkAdmin()
  
  if (!result.isAdmin) {
    redirect('/')
  }
  
  return result
}

export async function requireAuth(): Promise<string> {
  try {
    const supabase = await createClient()
    
    let { data: { user }, error: getUserError } = await supabase.auth.getUser()

    // If no user from cookies, try refreshing session
    if (!user) {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
      if (refreshError) {
        console.error('Session refresh error:', refreshError)
      }
      user = refreshData?.user ?? null
    }

    if (!user) {
      redirect('/auth/login')
    }

    return user.id
  } catch (error) {
    console.error('Unexpected error in requireAuth:', error)
    redirect('/auth/login')
  }
}
