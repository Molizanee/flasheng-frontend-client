import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  providerToken: string | null
  loading: boolean
  signInWithGitHub: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PROVIDER_TOKEN_KEY = 'flasheng_github_provider_token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [providerToken, setProviderToken] = useState<string | null>(
    () => localStorage.getItem(PROVIDER_TOKEN_KEY)
  )
  const [loading, setLoading] = useState(!!supabase) // only loading if supabase is configured

  useEffect(() => {
    if (!supabase) {
      // Supabase not configured — auth is disabled, nothing to initialize
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        // Capture provider_token from GitHub OAuth - only available right after sign in
        if (session?.provider_token) {
          localStorage.setItem(PROVIDER_TOKEN_KEY, session.provider_token)
          setProviderToken(session.provider_token)
        }

        if (!session) {
          localStorage.removeItem(PROVIDER_TOKEN_KEY)
          setProviderToken(null)
        }

        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGitHub = useCallback(async () => {
    if (!supabase) {
      throw new Error(
        'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
      )
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'read:user user:email repo',
      },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) {
      throw new Error(
        'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
      )
    }
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    localStorage.removeItem(PROVIDER_TOKEN_KEY)
    setProviderToken(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, session, providerToken, loading, signInWithGitHub, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
