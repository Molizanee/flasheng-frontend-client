import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!supabase) {
          setError('Supabase nao esta configurado.')
          return
        }

        // Supabase automatically processes the OAuth callback from the URL hash/params
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          setError(error.message)
          return
        }

        if (session) {
          // provider_token is captured by AuthContext's onAuthStateChange listener
          navigate('/generate', { replace: true })
        } else {
          setError('Nao foi possivel autenticar. Tente novamente.')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      }
    }

    handleCallback()
  }, [navigate])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-900 px-6">
        <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <svg
              className="h-7 w-7 text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">Erro na Autenticacao</h2>
          <p className="mb-6 text-sm text-white/40">{error}</p>
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600"
          >
            <span>Tentar Novamente</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark-900">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="h-8 w-8 animate-spin text-accent-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            fill="currentColor"
            className="opacity-75"
          />
        </svg>
        <p className="text-white/50">Autenticando...</p>
      </div>
    </div>
  )
}
