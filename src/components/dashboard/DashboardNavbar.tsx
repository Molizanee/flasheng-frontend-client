import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Zap, FileText, Coins, LogOut } from 'lucide-react'

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
    <nav className="border-b border-border-faint bg-bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-text-primary">
            Flash<span className="text-accent-secondary">Eng</span>
          </span>
        </Link>

        {/* Navigation tabs */}
        <div className="flex items-center gap-1 rounded-lg bg-bg-elevated p-1">
          <button
            onClick={() => onSectionChange('resumes')}
            className={`flex cursor-pointer items-center rounded-md px-4 py-2 text-body-m font-medium transition-all ${
              activeSection === 'resumes'
                ? 'bg-accent-primary text-white'
                : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            <FileText className="mr-2 h-4 w-4" />
            Resumos
          </button>
          <button
            onClick={() => onSectionChange('credits')}
            className={`flex cursor-pointer items-center rounded-md px-4 py-2 text-body-m font-medium transition-all ${
              activeSection === 'credits'
                ? 'bg-accent-primary text-white'
                : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            <Coins className="mr-2 h-4 w-4" />
            Creditos
            <span className="ml-2 rounded-full bg-bg-subtle px-2 py-0.5 text-xs">
              {credits}
            </span>
          </button>
        </div>

        {/* User menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSignOut}
            className="flex cursor-pointer items-center gap-1.5 text-body-m text-text-tertiary transition-colors hover:text-text-secondary"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
          {user?.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="h-8 w-8 rounded-full border border-border-default"
            />
          )}
        </div>
      </div>
    </nav>
  )
}
