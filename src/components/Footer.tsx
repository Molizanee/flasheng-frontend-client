import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border-faint py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold text-text-primary">
              Flash<span className="text-accent-secondary">Eng</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="#problema"
              className="text-body-s text-text-disabled transition-colors hover:text-text-tertiary"
            >
              O Problema
            </a>
            <a
              href="#como-funciona"
              className="text-body-s text-text-disabled transition-colors hover:text-text-tertiary"
            >
              Como Funciona
            </a>
            <a
              href="#diferenciais"
              className="text-body-s text-text-disabled transition-colors hover:text-text-tertiary"
            >
              Diferenciais
            </a>
          </div>

          {/* Copyright */}
          <p className="text-body-s text-text-disabled">
            &copy; {new Date().getFullYear()} FlashEng. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
