import { Link } from 'react-router-dom'
import { CoreLogo } from './CoreLogo'

export default function Footer() {
  return (
    <footer className="border-t border-border-faint py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <CoreLogo />
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

          {/* Suporte */}
          <p className="text-body-s text-text-disabled">
            Suporte: david.molizane@icloud.com
          </p>

          {/* Copyright */}
          <p className="text-body-s text-text-disabled">
            &copy; {new Date().getFullYear()} core. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
