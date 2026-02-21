import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FileText, Coins, LogOut, Plus } from 'lucide-react'
import { CoreLogo } from '../CoreLogo'
import Button from '../ui/Button'

interface DashboardNavbarProps {
  credits: number
  activeSection: 'resumes' | 'credits'
  onSectionChange: (section: 'resumes' | 'credits') => void
}

export default function DashboardNavbar({
  credits,
  activeSection,
  onSectionChange,
}: DashboardNavbarProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border-faint bg-bg-void/80 backdrop-blur-xl">
      {/* Top row: Logo + CTA + Avatar + Sign out */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <CoreLogo />
        </Link>

        {/* Desktop: Navigation tabs (centered) */}
        <div className="hidden items-center gap-1 rounded-lg bg-bg-elevated p-1 md:flex">
          <button
            onClick={() => onSectionChange('resumes')}
            className={`flex cursor-pointer items-center rounded-md px-4 py-2 text-body-m font-medium transition-all ${activeSection === 'resumes'
              ? 'bg-accent-primary text-white'
              : 'text-text-tertiary hover:text-text-primary'
              }`}
          >
            <FileText className="mr-2 h-4 w-4" />
            Resumos
          </button>
          <button
            onClick={() => onSectionChange('credits')}
            className={`flex cursor-pointer items-center rounded-md px-4 py-2 text-body-m font-medium transition-all ${activeSection === 'credits'
              ? 'bg-accent-primary text-white'
              : 'text-text-tertiary hover:text-text-primary'
              }`}
          >
            <Coins className="mr-2 h-4 w-4" />
            Créditos
            <span className="ml-2 rounded-full bg-bg-subtle px-2 py-0.5 text-xs">
              {credits}
            </span>
          </button>
        </div>

        {/* Right side: CTA + avatar + signout */}
        <div className="flex items-center gap-3">
          {/* Full text on desktop, icon-only on mobile */}
          <div className="hidden md:block">
            <Button to="/generate" size="md" variant="primary">
              Gerar Novo Resumo
            </Button>
          </div>
          <Link
            to="/generate"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-primary text-white transition-colors hover:bg-accent-primary/90 md:hidden"
            aria-label="Gerar Novo Resumo"
          >
            <Plus className="h-5 w-5" />
          </Link>

          {user?.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="h-8 w-8 rounded-full border border-border-default"
            />
          )}
          <button
            onClick={handleSignOut}
            className="flex cursor-pointer items-center gap-1.5 text-body-m text-text-tertiary transition-colors hover:text-text-secondary"
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Sair</span>
          </button>
        </div>
      </div>

      {/* Mobile bottom row: Tab bar */}
      <div className="flex items-center border-t border-border-faint md:hidden">
        <button
          onClick={() => onSectionChange('resumes')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${activeSection === 'resumes'
            ? 'border-b-2 border-accent-primary text-accent-primary'
            : 'text-text-tertiary'
            }`}
        >
          <FileText className="h-4 w-4" />
          Resumos
        </button>
        <button
          onClick={() => onSectionChange('credits')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all ${activeSection === 'credits'
            ? 'border-b-2 border-accent-primary text-accent-primary'
            : 'text-text-tertiary'
            }`}
        >
          <Coins className="h-4 w-4" />
          Créditos
          <span className="rounded-full bg-bg-subtle px-1.5 py-0.5 text-[10px]">
            {credits}
          </span>
        </button>
      </div>
    </nav>
  )
}
