import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Zap, LogOut } from 'lucide-react'
import Button from './ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-[var(--duration-default)] ${
        scrolled
          ? 'border-b border-border-faint bg-bg-void/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-text-primary">
            Flash<span className="text-accent-secondary">Eng</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#problema"
            className="text-body-m text-text-tertiary transition-colors hover:text-text-primary"
          >
            O Problema
          </a>
          <a
            href="#como-funciona"
            className="text-body-m text-text-tertiary transition-colors hover:text-text-primary"
          >
            Como Funciona
          </a>
          <a
            href="#diferenciais"
            className="text-body-m text-text-tertiary transition-colors hover:text-text-primary"
          >
            Diferenciais
          </a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button to="/dashboard" size="sm" variant="secondary">
                Dashboard
              </Button>
              <button
                onClick={handleSignOut}
                className="flex cursor-pointer items-center gap-1.5 text-body-m text-text-tertiary transition-colors hover:text-text-secondary"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full border border-border-default"
                />
              )}
            </>
          ) : (
            <Button to="/login" size="sm" variant="primary">
              Gerar Resumo Agora
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
