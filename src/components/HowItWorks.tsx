import { LogIn, Search, FileText } from 'lucide-react'
import Badge from './ui/Badge'

const steps = [
  {
    number: '01',
    title: 'Conecte',
    description:
      'Informe seu perfil LinkedIn e seu usuario GitHub. E so isso que precisamos para comecar.',
    icon: <LogIn className="h-8 w-8" />,
  },
  {
    number: '02',
    title: 'Analise',
    description:
      'Nosso motor de IA analisa seus repositorios, commits, READMEs e seu perfil profissional completo.',
    icon: <Search className="h-8 w-8" />,
  },
  {
    number: '03',
    title: 'Receba',
    description:
      'Receba seu resumo profissional otimizado para processos seletivos com agentes de IA e recrutadores.',
    icon: <FileText className="h-8 w-8" />,
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-6">Como Funciona</Badge>
          <h2 className="text-h1 mb-6 md:text-display-l">
            Tres Passos Para Seu{' '}
            <span className="gradient-text">Resumo Perfeito</span>
          </h2>
          <p className="text-body-l mx-auto max-w-2xl text-text-secondary">
            Simples, rapido e poderoso. Conecte suas contas e deixe a IA fazer o
            trabalho pesado.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connection line */}
          <div className="pointer-events-none absolute top-24 right-[33%] left-[33%] hidden h-px bg-gradient-to-r from-accent-primary/50 via-accent-secondary/50 to-accent-primary/50 md:block" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {/* Step icon */}
              <div className="gradient-border relative mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-bg-elevated text-accent-secondary">
                {step.icon}
              </div>

              {/* Step number badge */}
              <span className="text-label mb-3 text-accent-secondary">
                Passo {step.number}
              </span>

              <h3 className="text-h2 mb-3 text-text-primary">{step.title}</h3>
              <p className="text-body-m max-w-xs text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
