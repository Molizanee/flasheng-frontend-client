import { useState, useCallback, useEffect } from 'react'
import { api } from '../lib/api'
import type { MyResumeItem } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

const CREDITS_KEY = 'flasheng_credits'

export function useResumes() {
  const { session } = useAuth()
  const [resumes, setResumes] = useState<MyResumeItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResumes = useCallback(async () => {
    const token = session?.access_token
    if (!token) {
      setResumes([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await api.getMyResumes(token)
      setResumes(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao carregar resumos'
      setError(message)
      setResumes([])
    } finally {
      setLoading(false)
    }
  }, [session?.access_token])

  // Fetch on mount and when session changes
  useEffect(() => {
    fetchResumes()
  }, [fetchResumes])

  return { resumes, loading, error, refresh: fetchResumes }
}

export function useCredits() {
  const [credits, setCredits] = useState<number>(() => {
    return parseInt(localStorage.getItem(CREDITS_KEY) || '0', 10)
  })

  const refresh = useCallback(() => {
    setCredits(parseInt(localStorage.getItem(CREDITS_KEY) || '0', 10))
  }, [])

  return { credits, refresh }
}
