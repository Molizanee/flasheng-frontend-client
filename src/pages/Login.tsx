import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { ArrowLeft, Github } from 'lucide-react'
import { CoreLogo } from '../components/CoreLogo'

export default function Login() {
  const { signInWithGitHub, loading } = useAuth()

  const handleLogin = async () => {
    try {
      await signInWithGitHub()
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div className="dot-grid relative min-h-screen bg-bg-base">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-glow top-[-100px] left-[30%] bg-accent-primary" />
        <div className="hero-glow bottom-[-100px] right-[20%] bg-accent-secondary" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Back link */}
        <Link
          to="/"
          className="mb-10 flex items-center gap-2 text-body-m text-text-tertiary transition-colors hover:text-text-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o inicio
        </Link>

        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <CoreLogo />
        </div>

        <div className="glass-card w-full max-w-md rounded-xl p-8 md:p-10">
          <h1 className="text-h1 mb-2 text-center text-text-primary">
            Entrar no core
          </h1>
          <p className="text-body-m mb-8 text-center text-text-secondary">
            Conecte sua conta do GitHub para gerar resumos profissionais
            otimizados com IA.
          </p>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-white px-6 py-4 text-base font-semibold text-gray-900 transition-all duration-[var(--duration-default)] hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Github className="h-6 w-6" />
            <span>Entrar com GitHub</span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-body-s text-text-disabled">
              Ao entrar, voce concorda com nossos termos de uso.
              <br />
              Precisamos de acesso aos seus repositorios para gerar seu resumo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
