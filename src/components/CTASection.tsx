import { useAuth } from '../contexts/AuthContext'
import { Zap } from 'lucide-react'
import Button from './ui/Button'

export default function CTASection() {
  const { user } = useAuth()
  const ctaLink = user ? '/generate' : '/login'
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-h1 mb-6 md:text-display-l">
          Pronto Para{' '}
          <span className="gradient-text">Transformar Seu Curriculo</span>?
        </h2>
        <p className="text-body-l mx-auto mb-10 max-w-xl text-text-secondary">
          Junte-se aos profissionais que ja estao usando o FlashEng para se
          destacar nos processos seletivos modernos.
        </p>
        <Button to={ctaLink} size="xl" variant="primary">
          <Zap className="mr-3 h-6 w-6" />
          Gerar Resumo Agora
        </Button>
      </div>
    </section>
  )
}
