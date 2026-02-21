import { Github, Linkedin, Languages, TrendingUp } from 'lucide-react'
import Badge from './ui/Badge'
import GlassCard from './ui/GlassCard'

const features = [
  {
    icon: <Github className="h-7 w-7" />,
    title: 'Dados Reais do GitHub',
    description:
      'Repositórios, commits, pull requests e READMEs analisados para extrair suas habilidades técnicas reais e contribuições mais recentes.',
  },
  {
    icon: <Linkedin className="h-7 w-7" />,
    title: 'Perfil LinkedIn Integrado',
    description:
      'Experiência profissional, formação, certificações e recomendações do seu perfil público do LinkedIn integrados automaticamente.',
  },
  {
    icon: <Languages className="h-7 w-7" />,
    title: 'Português ou Inglês',
    description:
      'Gere seu currículo no idioma que precisar com um clique. Ideal para se candidatar a vagas nacionais e internacionais.',
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    title: 'Sempre Atualizado',
    description:
      'Baseado nos seus dados mais recentes. Cada novo commit, projeto ou atualização no LinkedIn é refletida no seu currículo automaticamente.',
  },
]

export default function Features() {
  return (
    <section id="diferenciais" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-6">Diferenciais</Badge>
          <h2 className="text-h1 mb-6 md:text-display-l">
            Por Que Usar o{' '}
            <span className="gradient-text">core</span>
          </h2>
          <p className="text-body-l mx-auto max-w-2xl text-text-secondary">
            Cada detalhe foi pensado para criar o currículo profissional mais
            completo e otimizado possível.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <GlassCard key={i} className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-5 md:p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent-secondary">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-h3 mb-2 text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-body-m text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
