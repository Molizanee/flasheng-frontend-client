import { useAuth } from '../contexts/AuthContext'
import Button from './ui/Button'

export default function CTASection() {
  const { user } = useAuth()
  const ctaLink = user ? '/generate' : '/login'
  return (
    <section className="relative py-12 md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-h1 mb-6 md:text-display-l">
          Pare de Perder Tempo{' '}
          <span className="gradient-text">Escrevendo Currículos</span>
        </h2>
        <p className="text-body-l mx-auto mb-10 max-w-xl text-text-secondary">
          Gere seu currículo otimizado em minutos a partir do seu LinkedIn e
          GitHub — em português ou inglês. Pronto para se candidatar.
        </p>
        <Button to={ctaLink} size="xl" variant="primary">
          Gerar Currículo Agora
        </Button>
      </div>
    </section>
  )
}
