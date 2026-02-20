import { useState, useCallback, useEffect } from 'react'
import { api } from '../lib/api'
import type { MyResumeItem } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

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
  const { session } = useAuth()
  const [credits, setCredits] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!session?.access_token) {
      setCredits(0)
      setLoading(false)
      return
    }

    try {
      const profile = await api.getUserProfile(session.access_token)
      setCredits(profile.credits)
    } catch (err) {
      console.error('Failed to fetch credits:', err)
      setCredits(0)
    } finally {
      setLoading(false)
    }
  }, [session?.access_token])

  useEffect(() => {
    setLoading(true)
    refresh()
  }, [refresh])

  return { credits, loading, refresh }
}
