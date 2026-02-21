import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, Menu, X } from 'lucide-react'
import Button from './ui/Button'
import { CoreLogo } from './CoreLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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

  const navLinks = [
    { href: '#problema', label: 'O Problema' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#diferenciais', label: 'Diferenciais' },
  ]

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-[var(--duration-default)] ${scrolled || mobileOpen
        ? 'border-b border-border-faint bg-bg-void/80 backdrop-blur-xl'
        : 'bg-transparent'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <CoreLogo />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-m text-text-tertiary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Auth buttons — always visible */}
          {user ? (
            <>
              <Button to="/dashboard" size="sm" variant="secondary">
                Dashboard
              </Button>
              <button
                onClick={handleSignOut}
                className="hidden cursor-pointer items-center gap-1.5 text-body-m text-text-tertiary transition-colors hover:text-text-secondary md:flex"
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
              Gerar Currículo Agora
            </Button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex cursor-pointer items-center justify-center rounded-md p-2 text-text-tertiary transition-colors hover:text-text-primary md:hidden"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="border-t border-border-faint bg-bg-void/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-body-m text-text-tertiary transition-colors hover:bg-bg-elevated hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
            {user && (
              <button
                onClick={() => {
                  setMobileOpen(false)
                  handleSignOut()
                }}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-body-m text-text-tertiary transition-colors hover:bg-bg-elevated hover:text-text-primary"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
